import { useState, useEffect } from 'react';
import './App.css';
import { apiCall } from './utils/apiCall'
import { DEFORMATION, DEFORMATION_TREND, TERMO, TERMO_TREND } from './constants/apiURLs'
import TermoDataTable from './components/tables/Termo/TermoDataTable'
import DeformDataTable from './components/tables/Deform/DeformDataTable'
import DeformChart from './components/charts/DeformChart'
import TermoChartDepth from './components/charts/TermoChartDepth'
import TermoChartTrend from './components/charts/TermoChartTrend'


function App() {
  const [termoData, setTermoData] = useState(null);
  const [termoTrendData, setTermoTrendData] = useState(null);
  const [deformData, setDeformData] = useState(null);
  const [deformTrendData, setDeformTrendData] = useState(null);

  const [showDeformChart, setShowDeformChart] = useState(false);
  const [showTermoChart, setShowTermoChart] = useState(false);
  const [showTermoTrendChart, setShowTermoTrendChart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setTermoData(await apiCall(TERMO));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setDeformData(await apiCall(DEFORMATION));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setDeformTrendData(await apiCall(DEFORMATION_TREND));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setTermoTrendData(await apiCall(TERMO_TREND));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {deformData && <DeformDataTable data={deformData.data} />}

      <button type="button" onClick={()=>setShowDeformChart(prev => !prev)}>
        Показать/скрыть график для деформационной марки
      </button>

      {showDeformChart && 
        <DeformChart 
          startDate = {Date.parse(new Date(deformTrendData.data.startDate))} 
          endDate = {Date.parse(new Date(deformTrendData.data.endDate))}
          critical = {Date.parse(new Date(deformTrendData.data.criticalEndDate))}
          dataDeform = {deformData.data}
          dataTrend = {deformTrendData.data.points}
      />}

      {termoData && <TermoDataTable data={termoData.data} />}

      <button type="button" onClick={()=>setShowTermoChart(prev => !prev)}>
        Показать/скрыть график для термокосы
      </button>

      {showTermoChart && 
        <TermoChartDepth 
          dataTermo = {termoData.data}
      />}

      <button type="button" onClick={()=>setShowTermoTrendChart(prev => !prev)}>
        Показать/скрыть график для тренда термокосы
      </button>

      {showTermoTrendChart && 
        <TermoChartTrend
          dataTermo = {termoData.data}
          dataTermoTrend ={termoTrendData.data.points}
          startDate = {Date.parse(new Date(termoTrendData.data.startDate))}
          critical = {Date.parse(new Date(termoTrendData.data.criticalEndDate))}
      />}
    </div>
  );
}

export default App;
