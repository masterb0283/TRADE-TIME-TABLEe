let user = {
  name: "ZORIANA",
  balance: 7850.42,
  transactions: []
};

const stocks = [
  "Bitcoin (BTC)",
  "Ethereum (ETH)",
  "Apple Stock",
  "Tesla Shares",
  "NASDAQ ETF",
  "S&P 500 Index",
  "Gold Futures"
];


// ==========================
// RENDER USER
// ==========================
function renderUser() {
  const nameEl = document.getElementById("userName");
  nameEl.textContent = user.name;

  const initials = user.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2);

  document.getElementById("avatar").textContent = initials;

  document.getElementById("balanceAmount").textContent =
    "$" + user.balance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
}


// ==========================
// RENDER TRANSACTIONS
// ==========================
function renderTransactions() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  user.transactions.forEach(tx => {
    const div = document.createElement("div");
    div.classList.add("transaction");

    const amountDisplay = tx.type === "credit"
      ? `<div class="credit">+ $${tx.amount.toLocaleString()}</div>`
      : `<div style="color:#dc2626;font-weight:700;">- $${tx.amount.toLocaleString()}</div>`;

    div.innerHTML = `
      <div>
        <div class="transaction-title">${tx.title}</div>
        <div class="transaction-date">${tx.date}</div>
      </div>
      ${amountDisplay}
    `;

    list.appendChild(div);
  });
}


// ==========================
// SAFE NAME EDIT (no breaking DOM)
// ==========================
document.getElementById("userName").addEventListener("click", function () {

  const currentName = user.name;
  const input = document.createElement("input");

  input.value = currentName;
  input.style.fontSize = "24px";
  input.style.fontWeight = "600";
  input.style.width = "180px";

  this.replaceWith(input);
  input.focus();

  function saveName() {
    user.name = input.value.trim().toUpperCase() || currentName;

    const span = document.createElement("span");
    span.id = "userName";
    span.classList.add("editable");
    span.textContent = user.name;

    input.replaceWith(span);

    span.addEventListener("click", arguments.callee);

    renderUser();
  }

  input.addEventListener("blur", saveName);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") saveName();
  });

});


// ==========================
// GENERATE RANDOM CREDIT (MAX $300)
// ==========================
function generateCredit() {

  const stock = stocks[Math.floor(Math.random() * stocks.length)];

  // 🔥 CREDIT LIMIT: between $20 and $300 only
  const amount = Math.floor(Math.random() * 281) + 20;

  user.balance += amount;

  const transaction = {
    title: `Stock Credit - ${stock}`,
    amount: amount,
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: "credit"
  };

  user.transactions.unshift(transaction);

  showAlert(`+ $${amount.toLocaleString()} credited from ${stock}`);

  renderUser();
  renderTransactions();
}


// ==========================
// ALERT SYSTEM
// ==========================
function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.classList.add("alert");
  alertBox.textContent = message;

  document.getElementById("alerts").prepend(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 5000);
}


// ==========================
// AUTO CREDIT EVERY 10s
// ==========================
setInterval(generateCredit, 10000);


// ==========================
// INIT
// ==========================
renderUser();
renderTransactions();
