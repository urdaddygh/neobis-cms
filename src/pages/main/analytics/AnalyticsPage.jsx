import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);
const AnalyticsPage = () => {
    const data = {
        labels: ['IOS', 'UX/UI design', 'PM', 'JAVA', 'JavaScript', 'Python'],
        datasets: [
          {
            label: 'Количество студентов',
            data: [20, 15, 10, 4, 15, 30],
            backgroundColor: [
              '#FFA500', // оранжевый для IOS
              '#32CD32', // зеленый для UX/UI design
              '#1E90FF', // синий для PM
              '#FF4500', // красный для JAVA
              '#FFD700', // желтый для JavaScript
              '#9370DB', // фиолетовый для Python
            ],
            hoverOffset: 4,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              color: 'white', // цвет надписей в легенде
              font: {
                size: 14,
              },
            },
          },
          
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.raw !== null) {
                  label += context.raw + ' чел';
                }
                return label;
              },
            },
          },
        },
        cutout: '70%',
      };
  return (
    <div className="default_cont">
      <div style={{ width: '440px', margin: '0 auto' }}>
      <h2 style={{textAlign:"center", margin:"0 0 40px 0", color:"white"}}>Популярность курсов</h2>
      <Doughnut data={data} options={options} />
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        <div style={{color:"white"}}>94</div>
        <p style={{color:"white"}}>Кол-во студентов</p>
      </div>
    </div>
    </div>
  );
};

export default AnalyticsPage;
