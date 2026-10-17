document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('ipsChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5 (Aktif)'],
      datasets: [{
        label: 'IPS',
        data: [3.65, 3.70, 3.72, 3.80, 3.82],
        backgroundColor: [
          'rgba(203, 213, 225, 0.65)',
          'rgba(203, 213, 225, 0.65)',
          'rgba(203, 213, 225, 0.65)',
          'rgba(203, 213, 225, 0.65)',
          '#0055A5' // Biru untuk semester aktif
        ],
        borderWidth: 1.5,
        borderRadius: 14,
        barThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { min: 3.0, max: 4.0 }
      }
    }
  });
});