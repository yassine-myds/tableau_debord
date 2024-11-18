const ctxLine = document.getElementById('regionChart').getContext('2d');
const ctxBar = document.getElementById('histogramChart').getContext('2d');
const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
const resetButton = document.getElementById('resetButton');
const dateRange = document.getElementById('dateRange');
const dateDisplay = document.getElementById('dateDisplay');


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


const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: { labels, datasets },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
    },
});


const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: { labels, datasets },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
    },
});


checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const datasetLine = lineChart.data.datasets.find((d) => d.label === checkbox.value);
        const datasetBar = barChart.data.datasets.find((d) => d.label === checkbox.value);
        if (datasetLine && datasetBar) {
            datasetLine.hidden = !checkbox.checked;
            datasetBar.hidden = !checkbox.checked;
            lineChart.update();
            barChart.update();
        }
    });
});


dateRange.addEventListener('input', () => {
    const index = parseInt(dateRange.value, 10);
    const filteredLabels = labels.slice(0, index + 1);
    dateDisplay.textContent = `${filteredLabels[0]} - ${filteredLabels[filteredLabels.length - 1]}`;

    lineChart.data.labels = filteredLabels;
    barChart.data.labels = filteredLabels;
    lineChart.data.datasets.forEach((dataset, i) => {
        dataset.data = datasets[i].data.slice(0, index + 1);
    });
    barChart.data.datasets.forEach((dataset, i) => {
        dataset.data = datasets[i].data.slice(0, index + 1);
    });

    lineChart.update();
    barChart.update();
});

resetButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => (checkbox.checked = true));
    dateRange.value = dateRange.max;
    dateDisplay.textContent = '2010 - 2025';

    lineChart.data.labels = labels;
    barChart.data.labels = labels;
    lineChart.data.datasets.forEach((dataset, i) => {
        dataset.hidden = false;
        dataset.data = datasets[i].data;
    });
    barChart.data.datasets.forEach((dataset, i) => {
        dataset.hidden = false;
        dataset.data = datasets[i].data;
    });

    lineChart.update();
    barChart.update();
});
