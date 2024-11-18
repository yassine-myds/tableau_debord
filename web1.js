// Sélection des éléments
const ctx = document.getElementById('regionChart').getContext('2d');
const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');

// Données de base
const data = {
    labels: ['2010', '2015', '2020', '2025'],
    datasets: [
        {
            label: 'Asia',
            data: [5000, 7000, 8000, 9000],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            hidden: false,
        },
        {
            label: 'Europe',
            data: [3000, 3500, 4000, 4500],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            hidden: false,
        },
        {
            label: 'Africa',
            data: [1500, 1600, 1700, 1800],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            hidden: false,
        },
        {
            label: 'Americas',
            data: [4000, 4200, 4500, 4800],
            borderColor: 'purple',
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            hidden: false,
        },
    ],
};

// Création du graphique
const regionChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Mise à jour du graphique selon les cases à cocher
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
        const region = e.target.value;
        const dataset = regionChart.data.datasets.find((d) => d.label === region);
        if (dataset) {
            dataset.hidden = !e.target.checked;
            regionChart.update();
        }
    });
});