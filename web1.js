// Données initiales
const labels = [2010, 2011, 2012, 2018, 2019];
const dataByRegion = {
    "Asia": [7120, 8930, 8080, 6070, 6080],
    "Europe": [12300, 13000, 12500, 11800, 12000],
    "Africa": [5000, 5200, 5100, 4800, 4900],
    "Americas": [15000, 15500, 14800, 14500, 15000],
};

let currentType = 'line'; // Type de graphique par défaut

// Configuration des datasets
const datasets = Object.keys(dataByRegion).map(region => ({
    label: region,
    data: dataByRegion[region],
    borderColor: getRandomColor(),
    backgroundColor: getRandomColor(),
    borderWidth: 2,
    fill: false,
}));

// Fonction pour générer des couleurs aléatoires
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

// Création du graphique
const ctx = document.getElementById('regionChart').getContext('2d');
const config = {
    type: currentType,
    data: {
        labels: labels,
        datasets: datasets
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Émissions de CO₂ par Région (en kilotonnes)',
                color: '#333',
                font: {
                    size: 18
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Kilotons de CO₂'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Année'
                }
            }
        }
    }
};
let chart = new Chart(ctx, config);

// Fonction pour changer le type de graphique
document.getElementById('changeTypeBtn').addEventListener('click', () => {
    currentType = currentType === 'line' ? 'bar' : 'line';
    chart.destroy(); // Détruire l'ancien graphique
    config.type = currentType;
    chart = new Chart(ctx, config);
});

// Fonction pour mettre à jour les données
document.getElementById('updateDataBtn').addEventListener('click', () => {
    // Générer de nouvelles données aléatoires
    Object.keys(dataByRegion).forEach(region => {
        dataByRegion[region] = dataByRegion[region].map(() => Math.floor(Math.random() * 20000));
    });

    // Mettre à jour le graphique
    chart.data.datasets.forEach((dataset, index) => {
        dataset.data = Object.values(dataByRegion)[index];
    });
    chart.update();
});
