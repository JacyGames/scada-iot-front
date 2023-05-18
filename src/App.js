import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const getOptions = (label)=> {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: label,
      },
    },
  };
}

const airTemperature = [
   178, 178.3,  178.5,  178.9, 179.3, 179.7,  180,  180.5, 
   181, 180, 180, 180
];

const milkHumidity = [
  3.46, 3.47,
  3.48,3.49,
  3.5, 3.5, 3.5
];

const milkPressure = [
  139, 139.5,  140, 140.5, 140.9, 140.9, 140, 140
];

const milkTemperature = [
  78.6, 78.9, 
   79.5, 
   79.8,  80, 80.2, 80, 80
];

function generateDataForGraph(data) {

  const today = new Date();

  const yesterday = new Date(today.getTime());
  yesterday.setDate(today.getDate() - 1);

  const secondsDay = (today.getTime()) - (yesterday.getTime());

  const step = Math.ceil(secondsDay / data.length);

  const labels = [];

  for(let i = secondsDay; i>=0; i-=step) {
      const tempDate = new Date(today.getTime() - i );
      labels.push(`${tempDate.getHours()}:${tempDate.getMinutes()}`)
  }


  return {
    labels,
    data
  };
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const generateDataSet = (dataset) => {
  const {labels, data} = generateDataForGraph(dataset);
  const col = getRandomColor();
  return {
    labels,
    datasets: [
      {
        label: 'Крива розгону',
        data,
        borderColor: col,
        backgroundColor: col,
      },
    ],
  };
}

function App() {
  return <div>
    <div style={{display: 'flex', margin: '50px 0'}}>
      <div style={{width: '800px'}}>
        <Line options={getOptions('Вологість сухого молока')} data={generateDataSet(milkHumidity)} />
        <div style={{'padding-left': '20px'}}>
          Максимальне динамічне відхилення: 0.04
        </div>
      </div>
      <div style={{width: '800px'}}>
        <Line options={getOptions('Температура повітря на вході в сушарку')} data={generateDataSet(airTemperature)} />
        <div style={{'padding-left': '20px'}}>
          Максимальне динамічне відхилення: 2
        </div>
      </div>
    </div>
   <div style={{display: 'flex', 'margin-bottom': '50px'}}>
    <div style={{width: '800px'}}>
      <Line options={getOptions('Температура молока на вході в сушарку')} data={generateDataSet(milkTemperature)} />
      <div style={{'padding-left': '20px'}}>
          Максимальне динамічне відхилення: 1.4
        </div>
    </div>
      <div style={{width: '800px'}}>
      <Line options={getOptions('Напір молока на вході в сушарку')} data={generateDataSet(milkPressure)} />
      <div style={{'padding-left': '20px'}}>
          Максимальне динамічне відхилення: 1
        </div>
      </div>
   </div>
    
  
  </div>
  

}

export default App;