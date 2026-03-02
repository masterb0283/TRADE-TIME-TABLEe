let totalRotation = 0; // tracks cumulative rotation

document.getElementById("spinBtn").addEventListener("click", () => {
  if (spinning) return;

  let spinsLeft = parseInt(localStorage.getItem("spinsLeft"));
  if (spinsLeft <= 0) {
    document.getElementById("message").textContent = "You have used all your spins!";
    return;
  }

  spinning = true;
  spinsLeft--;
  localStorage.setItem("spinsLeft", spinsLeft);
  document.getElementById("spinsLeft").textContent = `Spins left: ${spinsLeft}`;

  const result = weightedRandom();
  const index = segments.indexOf(result);
  const arc = 360 / segments.length;

  // Randomize a bit within the segment for realism
  const extra = Math.random() * arc - arc / 2;

  // Add 5 full spins + segment offset + randomness
  const spinDegrees = 360 * 5 + (360 - index * arc - extra);

  totalRotation += spinDegrees; // increment cumulative rotation

  canvas.style.transition = "transform 4s ease-out";
  canvas.style.transform = `rotate(${totalRotation}deg)`;

  setTimeout(() => {
    if (result.value === "TRY AGAIN") {
      document.getElementById("message").textContent = "Try Again!";
      spinning = false;
    } else {
      localStorage.setItem("prize", result.value);
      window.location.href = "claim.html";
    }
  }, 4000);
});
