import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TermoChartTrend = ({ dataTermo, dataTermoTrend, critical, startDate }) => {
  const [chartData, setChartData] = useState({
    data: [],
    layout: {
      xaxis: {
        title: 'Дата',
        type: 'date',
      },
      yaxis: {
        title: 'Температура, °С',
      },
      shapes: [
        {
          type: 'line',
          x0: critical,
          x1: critical,
          y0: -8,
          y1: 1,
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
          x0: critical,
          // x1: startDate,
          y0: -0.5,
          y1: -0.5,
          line: {
            color: 'orange',
            width: 2,
          },
          label: {
            text: 'Te max'
          }
        }
      ],
    },
  });

  useEffect(() => {
    const trace1 = {
      type: 'scatter',
      mode: 'lines+markers',
      x: dataTermo.map(item => item.time),
      y: dataTermo.map(item => item.averageTemperature),
      name: 'Тренд Те',
    };

    const dataTrendx = []
    const dataTrendy = []

    for (const [key, value] of Object.entries(dataTermoTrend)) {
      dataTrendx.push(Date.parse(new Date(key)))
      dataTrendy.push(value)
    }

    const trace2 = {
      type: 'scatter',
      mode: 'lines+markers',
      x: dataTrendx,
      y: dataTrendy,
      name: 'Te, °С',
    };

    setChartData(prevState => ({
      ...prevState,
      data: [trace1, trace2],
    }));
  }, [dataTermo, dataTermoTrend]);

  return (
    <Plot
      data={chartData.data}
      layout={chartData.layout}
    />
  );
};

export default TermoChartTrend;