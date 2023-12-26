import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const DeformChart = ({ dataDeform, dataTrend, startDate, endDate, critical }) => {
  const [chartData, setChartData] = useState({
    data: [],
    layout: {
      xaxis: {
        type: 'date',
        range: [startDate, endDate],
        dtick: 'M6', // Шаг в полгода
        title: 'Дата'
      },
      yaxis: {
        title: 'Смещение (△), м'
      },
      shapes: [
        {
          type: 'line',
          x0: critical,
          x1: critical,
          y0: 0.05,
          y1: -0.02,
          line: {
            color: 'black',
            width: 5,
          },
          label: {
            text: 'Конец эксплуатации'
          }
        },
        {
          type: 'line',
          y0: 0.02,
          y1: 0.02,
          x0: startDate,
          x1: endDate,
          line: {
            color: 'orange',
            width: 2,
          },
          label: {
            text: 'Макс. △, м', 
            yanchor:'top'
          }
        },
        {
          type: 'line',
          y0: -0.02,
          y1: -0.02,
          x0: startDate,
          x1: endDate,
          line: {
            color: 'green',
            width: 2,
          },
          label: {
            text: 'Мин. △, м'
          }
        },
      ],
    },
  });

  useEffect(() => {
    const trace1 = {
      type: 'scatter',
      mode: 'lines+markers',
      x: dataDeform.map(item => item.time),
      y: dataDeform.map(item => item.data.delta),
      name: '△',
    };

    const dataTrendx = []
    const dataTrendy = []

    for (const [key, value] of Object.entries(dataTrend)) {
      dataTrendx.push(Date.parse(new Date(key)))
      dataTrendy.push(value)
    }

    const trace2 = {
      type: 'scatter',
      mode: 'lines+markers',
      x: dataTrendx,
      y: dataTrendy,
      name: 'Тренд △',
    };

    setChartData(prevState => ({
      ...prevState,
      data: [trace1, trace2],
    }));
  }, [dataDeform, dataTrend]);

  return (
    <Plot
      data={chartData.data}
      layout={chartData.layout}
    />
  );
};

export default DeformChart;