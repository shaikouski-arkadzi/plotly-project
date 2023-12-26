import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import {isoToDate} from '../../../utils/isoToDate'
import AscSortIcon from '../../shared/AscSortIcon';
import DescSortIcon from '../../shared/DescSortIcon';
import "react-datepicker/dist/react-datepicker.css";
import styles from './TermoDataTable.module.css'

const TermoDataTable = ({ data }) => {
  const numbersArray = [];

  for (let i = 0; i <= 29; i += 0.5) {
    numbersArray.push(i);
  }

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState(data)
  
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (startDate && endDate) {
      setSortedData(data.filter(
        (item) => Date.parse(new Date(item.time)) >= startDate && Date.parse(new Date(item.time)) <= endDate.setHours(23, 59, 59)
      ))
    };

    if (startDate === null && endDate === null) {
      setSortedData(data)
    }
  },[startDate, endDate])

  useEffect(()=>{
    setSortedData(prevData => prevData
      .slice()
      .sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
    
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }))
  },[sortOrder, data])

  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles["table"]}>
        <thead className={styles["table__head"]}>
          <tr>
            <th 
              className={styles["pin-head"]}
              rowSpan='2'
            >
              <div 
                className={styles["time-column-header"]} 
                onClick={handleSort}>
                  Time 
                  {sortOrder === 'desc' 
                    ? <DescSortIcon /> 
                    : <AscSortIcon />
                  }
              </div>
              <div className={styles["date-picker-container"]}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                />
              </div>
            </th>
            <th rowSpan='2' className={styles["pin-head"]}>Average Temperature</th>
            <th colSpan={numbersArray.length} className={styles["pin-head"]}>
              <div className={styles["pin-head__depth-title"]}>Depth</div>
            </th>
          </tr>
          <tr>
            {numbersArray.map(e=><th className={styles["depth-value"]}>{e}</th>)}
          </tr>
        </thead>

        <tbody className={styles["table__body"]}>
          {sortedData.map((dataItem) => (
            <tr key={dataItem.objectId}>
              <th>{isoToDate(new Date(dataItem.time))}</th>
              <th>{dataItem.averageTemperature.toFixed(2)}</th>
              {numbersArray.map(e => (
                <td key={e}>
                  {dataItem.data[e] ? dataItem.data[e].value.toFixed(2) : 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TermoDataTable;