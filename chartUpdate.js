const ctx = document.getElementById('sensorChart').getContext('2d');
const sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'red', // 선 색상 변경
            backgroundColor: 'rgba(255, 0, 0, 0.2)', // 배경 색상 변경
            borderWidth: 2 // 선의 두께 변경
        }, {
            label: 'Humidity (%)',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderWidth: 2
        }, {
            label: 'Water Flow (L/min)',
            data: [],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderWidth: 2
        }, {
            label: 'Air Quality Index',
            data: [],
            borderColor: 'purple',
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            borderWidth: 2
        }, {
            label: 'Flex Pressure',
            data: [],
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // 축 눈금선 스타일 변경
                    color: 'black',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },
                grid: {
                    // 눈금선 스타일 변경
                    color: 'gray',
                    borderColor: 'black',
                    borderWidth: 1
                }
            },
            x: {
                ticks: {
                    // x 축 눈금선 스타일 변경
                    color: 'black',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },
                grid: {
                    // x 축 눈금선 스타일 변경
                    color: 'gray',
                    borderColor: 'black',
                    borderWidth: 1
                }
            }
        }
    }
});


async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();
    temperatureCheckbox = document.getElementById('temperatureCheckbox');
    humidityCheckbox = document.getElementById('humidityCheckbox');
    water_flowCheckbox = document.getElementById('water-flowCheckbox');
    air_quality_indexCheckbox = document.getElementById('air-quality-indexCheckbox');
    flex_pressureCheckbox = document.getElementById('flex-pressureCheckbox');
    // 차트 데이터
    sensorChart.data.labels = data.map(d => d.time);
    function updateChart() {
        sensorChart.data.datasets[0].data = temperatureCheckbox.checked ? data.map(d => d.temperature) : [];
        sensorChart.data.datasets[1].data = humidityCheckbox.checked ? data.map(d => d.humidity) : [];
        sensorChart.data.datasets[2].data = water_flowCheckbox.checked ? data.map(d => d.water_flow) : [];
        sensorChart.data.datasets[3].data = air_quality_indexCheckbox.checked ? data.map(d => d.air_quality_index) : [];
        sensorChart.data.datasets[4].data = flex_pressureCheckbox.checked ? data.map(d => d.flex_pressure) : [];
        sensorChart.update();
    }
    
    // 각 체크박스에 이벤트 리스너 추가
    temperatureCheckbox.addEventListener('change', updateChart);
    humidityCheckbox.addEventListener('change', updateChart);
    water_flowCheckbox.addEventListener('change', updateChart);
    air_quality_indexCheckbox.addEventListener('change', updateChart);
    flex_pressureCheckbox.addEventListener('change', updateChart);
    
    // 초기 차트 업데이트 함수 호출
    updateChart();
    //데이터 칸 업뎃
    document.getElementById('temperature-box').textContent = `Temperature: ${data[0].temperature} °C`;
    document.getElementById('humidity-box').textContent = `Humidity: ${data[0].humidity} %`;
    document.getElementById('water-flow-box').textContent = `Water Flow: ${data[0].water_flow} L/min`;
    document.getElementById('air-quality-box').textContent = `Air Quality Index: ${data[0].air_quality_index}`;
    document.getElementById('flex-pressure-box').textContent = `Flex Pressure: ${data[0].flex_pressure}`;
}

setInterval(fetchData, 10000); // 10초 간격 업뎃