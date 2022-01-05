
async function getData() {

    const years = [];
    const globalTemperatures = [];
    const nhTemperatures = [];
    const shTemperatures = [];
    

    const response = await fetch("zonetemp.csv");
    const data = await response.text();

    const table = data.split("\n").slice(1);
    table.forEach(row => {
        const column = row.split(",");
        const year = column[0];
        years.push(year);
        const temp = column[1];
        globalTemperatures.push(parseFloat(temp) + 14);
        const tempNH = column[2];
        nhTemperatures.push(parseFloat(tempNH) + 14);
        const tempSH = column[3];
        shTemperatures.push(parseFloat(tempSH) + 14);

    })
    
    return {years, globalTemperatures, nhTemperatures, shTemperatures}

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
            data: data.globalTemperatures,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)'
                
            ],
            borderWidth: 2,
        
        },
        {
            label: 'Durschnittliche Temperatur der Nordhalbkugel in °C',
            data: data.nhTemperatures,
            backgroundColor: [
                'rgba(39, 106, 245, 1)'
            ],
            borderColor: [
                'rgba(39, 106, 245, 0.8)'
                
            ],
            borderWidth: 2,
        
        },
        {
            label: 'Durschnittliche Temperatur der Südhalbkugel in °C',
            data: data.shTemperatures,
            backgroundColor: [
                'rgba(245, 178, 39, 1)'
            ],
            borderColor: [
                'rgba(245, 178, 39, 0.8)'
                
            ],
            borderWidth: 2,
        
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Globale Erderwärmung'
            },
            subtitle: {
                display: true,
                text: 'Unregelmäßigkeiten der kombinierten Landluft- und Meeresoberflächentemperatur'
            }
        },
        scales: {
            y: {
                ticks: {
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