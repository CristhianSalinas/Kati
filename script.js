const startDate = new Date("2025-03-16"); // CAMBIA ESTA FECHA

function updateCounters() {
  const today = new Date();

  // Calcular meses completos
  let months = (today.getFullYear() - startDate.getFullYear()) * 12;
  months += today.getMonth() - startDate.getMonth();

  if (today.getDate() < startDate.getDate()) {
    months--;
  }

  document.getElementById("months").textContent = months;

  // Calcular días para el siguiente mes
  let nextMonthDate = new Date(today);
  nextMonthDate.setDate(startDate.getDate());

  if (today.getDate() >= startDate.getDate()) {
    nextMonthDate.setMonth(today.getMonth() + 1);
  }

  const diffTime = nextMonthDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById("days").textContent = diffDays;
}

updateCounters();
setInterval(updateCounters, 1000);
