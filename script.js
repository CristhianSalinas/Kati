// Cambia esta fecha a la de inicio de la relación
const startDate = new Date("2025-03-16"); 

// Referencias a elementos
const monthsEl = document.getElementById("months");
const daysLeftEl = document.getElementById("daysLeft");
const totalDaysEl = document.getElementById("totalDays");
const letterEl = document.getElementById("letter");
const surpriseBtn = document.getElementById("surpriseBtn");
const secretInput = document.getElementById("secretInput");
const unlockBtn = document.getElementById("unlockBtn");
const secretMessage = document.getElementById("secretMessage");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");

let musicPlaying = false;

// Función para actualizar contadores
function updateCounters() {
  const today = new Date();

  // --- Días totales ---
  const diffTime = today - startDate;
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  totalDaysEl.textContent = totalDays >= 0 ? totalDays : 0;

  // --- Meses completos ---
  let months = (today.getFullYear() - startDate.getFullYear()) * 12;
  months += today.getMonth() - startDate.getMonth();
  if (today.getDate() < startDate.getDate()) months--; // no contar mes incompleto
  monthsEl.textContent = months >= 0 ? months : 0;

  // --- Días para el próximo mes ---
  let nextMonthDate = new Date(startDate);
  nextMonthDate.setFullYear(today.getFullYear());
  nextMonthDate.setMonth(today.getMonth());

  if (today.getDate() >= startDate.getDate()) {
    nextMonthDate.setMonth(today.getMonth() + 1);
  }

  // Ajustar si el mes no tiene el mismo día (ej: febrero)
  const lastDayOfMonth = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1, 0).getDate();
  if (nextMonthDate.getDate() > lastDayOfMonth) {
    nextMonthDate.setDate(lastDayOfMonth);
  }

  const diffNext = nextMonthDate - today;
  const daysLeft = Math.ceil(diffNext / (1000 * 60 * 60 * 24));
  daysLeftEl.textContent = daysLeft >= 0 ? daysLeft : 0;
}

// Ejecutar contadores cada segundo
updateCounters();
setInterval(updateCounters, 1000);

// --- Carta sorpresa ---
surpriseBtn.onclick = () => {
  letterEl.classList.toggle("hidden");
};

// --- Mensaje secreto ---
// Ejemplo de contraseña: 1506 (DDMM de la fecha)
unlockBtn.onclick = () => {
  if (secretInput.value === "1603") {
    secretMessage.classList.remove("hidden");
  } else {
    alert("Contraseña incorrecta 💔");
  }
};

// --- Música ---
musicBtn.onclick = () => {
  if (!musicPlaying) {
    music.play();
    musicPlaying = true;
    musicBtn.textContent = "⏸ Pausar música";
  } else {
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = "🎵 Activar música";
  }
};

// --- Corazones al tocar ---
document.addEventListener("click", function(e) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 2000);
});
