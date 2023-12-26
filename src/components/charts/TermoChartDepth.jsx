import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import {isoToDate} from '../../utils/isoToDate';

const TermoChartDepth = ({ dataTermo }) => {
  const [chartData, setChartData] = useState({
    data: [],
    layout: {
      xaxis: {
        title: 'Температура, °С',
      },
      yaxis: {
        title: 'Глубина, м',
        autorange: 'reversed',
      },
      shapes: [
        {
          type: 'line',
          x0: -0.5,
          x1: -0.5,
          y0: 0,
          y1: 29,
          line: {
            color: 'red',
            width: 2,
          },
          label: {
            text: 'Te'
          }
        }
      ],
    },
  });

  useEffect(() => {
    const traces = dataTermo.map(dataItem => {
      const datax = [];
      const datay = [];
      for (const [key, value] of Object.entries(dataItem.data)) {
        datax.push(value.value)
        datay.push(+key)
      }
      return {
        type: 'scatter',
        mode: 'lines+markers',
        name: isoToDate(new Date(dataItem.time)),
        x: datax,
        y: datay,
      }
    });

    setChartData(prevState => ({
      ...prevState,
      data: traces,
    }));
  }, [dataTermo]);

  return (
    <Plot
      data={chartData.data}
      layout={chartData.layout}
    />
  );
};

export default TermoChartDepth;