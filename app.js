
async function getData() {

    const years = [];
    const temperatures = [];

    const response = await fetch("zonetemp.csv");
    const data = await response.text();

    const table = data.split("\n").slice(1);
    table.forEach(row => {
        const column = row.split(",");
        const year = column[0];
        years.push(year);
        const temp = column[1];
        temperatures.push(parseFloat(temp) + 14);
    })

    return {years, temperatures}

}


async function renderChart() {
    const data = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.years,
        datasets: [{
            label: 'Durschnittliche Temperatur der Erde in °C',
            data: data.temperatures,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
                
            ],
            borderWidth: 2,
        
        },]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value + " °C";
                    }
                }
            }
        },
        

    },
    
});
}


renderChart();