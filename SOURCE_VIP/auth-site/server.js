const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) { console.error('Set the ADMIN_PASSWORD environment variable first.'); process.exit(1); }

const DB = path.join(process.env.DATA_DIR || __dirname, 'codes.json');
const PUBLIC = path.join(__dirname, 'public');
const load = () => { try { return JSON.parse(fs.readFileSync(DB, 'utf8')); } catch { return []; } };
const save = d => { fs.writeFileSync(DB + '.tmp', JSON.stringify(d, null, 2)); fs.renameSync(DB + '.tmp', DB); };
const norm = s => String(s || '').trim().toUpperCase();
const clientIp = req => String(req.ip || '').replace('::ffff:', '');
function describe(ua = '') {
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad|iOS/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac OS/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Unknown OS';
  const br = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Unknown browser';
  return `${br} on ${os}`;
}
const clearUsage = r => { r.deviceId = null; r.token = null; r.firstIp = null; r.lastIp = null; r.device = null; r.lastBlocked = null; r.loginCount = 0; };
const sha = s => crypto.createHash('sha256').update(String(s)).digest();
const newCode = () => { const c = () => crypto.randomBytes(3).toString('hex').toUpperCase(); return `${c()}-${c()}`; };

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json());

// ---- helpers ----
function getToken(req) {
  const m = (req.headers.cookie || '').match(/(?:^|;\s*)session=([a-f0-9]{64})/);
  return m ? m[1] : null;
}
function sessionRecord(req) {
  const t = getToken(req);
  if (!t) return null;
  return load().find(r => r.active && r.token === t) || null;
}
function requireSession(req, res, next) {
  if (sessionRecord(req)) { res.set('Cache-Control', 'no-store'); return next(); }
  res.redirect('/');
}
function requireAdmin(req, res, next) {
  const h = req.headers.authorization || '';
  const [u, p] = Buffer.from(h.split(' ')[1] || '', 'base64').toString().split(/:(.*)/s);
  const ok = crypto.timingSafeEqual(sha(u || ''), sha(ADMIN_USER)) & crypto.timingSafeEqual(sha(p || ''), sha(ADMIN_PASSWORD));
  if (ok) return next();
  res.set('WWW-Authenticate', 'Basic realm="Admin"').status(401).send('Admin login required');
}

// ---- simple brute-force limit: 20 attempts / 15 min / IP ----
const hits = new Map();
function limiter(req, res, next) {
  const ip = req.ip, now = Date.now();
  let h = hits.get(ip);
  if (!h || h.reset < now) h = { n: 0, reset: now + 15 * 60 * 1000 };
  h.n++; hits.set(ip, h);
  if (h.n > 20) return res.status(429).json({ error: 'Too many attempts. Try again in a few minutes.' });
  next();
}

// ---- public API ----
app.post('/api/login', limiter, (req, res) => {
  const code = norm(req.body.code);
  const deviceId = String(req.body.deviceId || '').slice(0, 100);
  if (!code || !deviceId) return res.status(400).json({ error: 'Enter your authorization code to continue.' });

  const db = load();
  const rec = db.find(r => r.code === code);
  if (!rec || !rec.active) return res.status(401).json({ error: 'That code is not valid. Check it and try again, or contact your admin.' });
  if (rec.deviceId && rec.deviceId !== deviceId) {
    rec.lastBlocked = { ip: clientIp(req), device: describe(req.headers['user-agent']), at: new Date().toISOString() };
    save(db);
    return res.status(403).json({ error: 'This code is already in use on another device. Contact your admin to reset it.' });
  }

  rec.deviceId = deviceId;
  rec.token = crypto.randomBytes(32).toString('hex');
  rec.lastLogin = new Date().toISOString();
  const ip = clientIp(req);
  rec.firstIp = rec.firstIp || ip;
  rec.lastIp = ip;
  rec.device = describe(req.headers['user-agent']);
  rec.loginCount = (rec.loginCount || 0) + 1;
  save(db);
  res.set('Set-Cookie', `session=${rec.token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
  res.json({ ok: true });
});

app.get('/api/session', (req, res) => res.json({ ok: !!sessionRecord(req) }));
app.post('/api/logout', (req, res) => {
  const t = getToken(req);
  if (t) { const db = load(); const r = db.find(x => x.token === t); if (r) { r.token = null; save(db); } }
  res.set('Set-Cookie', 'session=; Path=/; Max-Age=0').json({ ok: true });
});

// ---- admin API ----
app.use('/api/admin', requireAdmin);
const safe = r => ({ code: r.code, name: r.name, active: r.active, deviceBound: !!r.deviceId, lastLogin: r.lastLogin || null, created: r.created, firstIp: r.firstIp || null, lastIp: r.lastIp || null, device: r.device || null, loginCount: r.loginCount || 0, lastBlocked: r.lastBlocked || null });

app.get('/api/admin/codes', (req, res) => res.json(load().map(safe)));

app.post('/api/admin/codes', (req, res) => {
  const db = load();
  const code = norm(req.body.code) || newCode();
  if (db.some(r => r.code === code)) return res.status(409).json({ error: 'That code already exists.' });
  db.push({ code, name: String(req.body.name || '').slice(0, 80), active: true, deviceId: null, token: null, created: new Date().toISOString() });
  save(db);
  res.json({ ok: true, code });
});

app.patch('/api/admin/codes/:code', (req, res) => {
  const db = load();
  const rec = db.find(r => r.code === norm(req.params.code));
  if (!rec) return res.status(404).json({ error: 'Code not found.' });
  const b = req.body;
  if (typeof b.name === 'string') rec.name = b.name.slice(0, 80);
  if (typeof b.active === 'boolean') { rec.active = b.active; if (!b.active) rec.token = null; }
  if (b.resetDevice) clearUsage(rec);
  if (b.newCode) {
    const nc = norm(b.newCode);
    if (db.some(r => r.code === nc && r !== rec)) return res.status(409).json({ error: 'That code already exists.' });
    rec.code = nc; clearUsage(rec); // new code starts fresh
  }
  save(db);
  res.json({ ok: true });
});

app.delete('/api/admin/codes/:code', (req, res) => {
  save(load().filter(r => r.code !== norm(req.params.code)));
  res.json({ ok: true });
});

// ---- pages ----
app.get('/admin.html', requireAdmin, (req, res) => res.sendFile(path.join(PUBLIC, 'admin.html')));
// Small script added to every protected page: checks every 5 seconds (and when the
// tab is reopened) that the code is still active, and signs the user out if not.
const GUARD = "<script>(function(){function c(){fetch('/api/session',{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){if(!d.ok)location.replace('/')}).catch(function(){})}setInterval(c,5000);document.addEventListener('visibilitychange',function(){if(!document.hidden)c()});})();</script>";
function sendPage(res, file) {
  fs.readFile(file, 'utf8', (e, html) => {
    if (e) return res.status(404).send('Not found');
    html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, () => GUARD + '</body>') : html + GUARD;
    res.set('Cache-Control', 'no-store').type('html').send(html);
  });
}
app.get('/', (req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));
// Everything else (every page, image, script, stylesheet) needs a signed-in session.
// Only the login page itself is open to visitors.
const OPEN = new Set(['/', '/index.html', '/favicon.ico']);
app.use((req, res, next) => {
  if (OPEN.has(req.path)) return next();
  if (sessionRecord(req)) {
    res.set('Cache-Control', 'no-store');
    if (/\.html?$/i.test(req.path)) {
      let file;
      try { file = path.join(PUBLIC, decodeURIComponent(req.path)); } catch { return res.status(400).end(); }
      if (file.startsWith(PUBLIC + path.sep) && fs.existsSync(file)) return sendPage(res, file);
    }
    return next();
  }
  if (req.accepts('html')) return res.redirect('/');
  res.status(401).end();
});
app.use(express.static(PUBLIC, { index: false, dotfiles: 'deny' }));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}  (admin: /admin.html)`));
}

module.exports = app;