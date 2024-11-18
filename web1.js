// Sélection des éléments
const ctxLine = document.getElementById('regionChart').getContext('2d');
const ctxBar = document.getElementById('histogramChart').getContext('2d');
const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
const resetButton = document.getElementById('resetButton');

// Données de base
const labels = ['2010', '2015', '2020', '2025'];
const datasets = [
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
];

// Graphique en ligne
const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: labels,
        datasets: datasets,
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    },
});

// Histogramme
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: datasets.map((dataset) => ({
            ...dataset,
            borderWidth: 1,
        })),
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    },
});

// Mise à jour des graphiques selon les cases à cocher
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
        const region = e.target.value;
        const datasetLine = lineChart.data.datasets.find((d) => d.label === region);
        const datasetBar = barChart.data.datasets.find((d) => d.label === region);
        if (datasetLine && datasetBar) {
            datasetLine.hidden = !e.target.checked;
            datasetBar.hidden = !e.target.checked;
            lineChart.update('active');
            barChart.update('active');
        }
    });
});

// Bouton de réinitialisation des filtres
resetButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
        const datasetLine = lineChart.data.datasets.find((d) => d.label === checkbox.value);
        const datasetBar = barChart.data.datasets.find((d) => d.label === checkbox.value);
        if (datasetLine && datasetBar) {
            datasetLine.hidden = false;
            datasetBar.hidden = false;
        }
    });
    lineChart.update();
    barChart.update();
});
