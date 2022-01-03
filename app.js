const xlabels = [];
const yvalues = [];


async function getData() {

    const response = await fetch("zonetemp.csv");
    const data = await response.text();

    const table = data.split("\n").slice(1);
    table.forEach(row => {
        const column = row.split(",");
        const year = column[0];
        xlabels.push(year);
        const temp = column[1];
        yvalues.push(parseFloat(temp) + 14);
    })

}


async function renderChart() {
    await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xlabels,
        datasets: [{
            label: 'Durschnittliche Temperatur der Erde',
            data: yvalues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            // fill: true
        
        },]
    }
});
}


renderChart();