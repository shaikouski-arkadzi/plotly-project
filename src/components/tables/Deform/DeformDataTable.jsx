import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import {generateRomanNumbersDESCSorted} from '../../../utils/generateRomanNumbersDESCSorted';
import {isoToDate} from '../../../utils/isoToDate';
import AscSortIcon from '../../shared/AscSortIcon';
import DescSortIcon from '../../shared/DescSortIcon';
import "react-datepicker/dist/react-datepicker.css";
import styles from './DeformDataTable.module.css';

const DeformDataTable = ({ data }) => {
  const cycles = generateRomanNumbersDESCSorted(data.length);
  let cycleIteration = 0;

  const dataWithCycles = data.map((i) => {
    i.cycle=cycles[cycleIteration++];
    return i;
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedData, setSortedData] = useState(dataWithCycles);
  
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (startDate && endDate) {
      setSortedData(dataWithCycles.filter(
        (item) => Date.parse(new Date(item.time)) >= startDate && Date.parse(new Date(item.time)) <= endDate.setHours(23, 59, 59)
      ))
    };

    if (startDate === null && endDate === null) {
      setSortedData(dataWithCycles)
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
  },[sortOrder])

  return (
    <div className={`${styles["table-wrapper"]} ${styles["table-wrapper"]}`}>
      <table className={styles.table}>
        <thead className={styles["table__head"]}>
          <tr>
            <th className={styles["pin-head"]} >
              <div className={styles["time-column-header"]} onClick={handleSort}>
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
            <th className={styles["pin-head"]}>Cycle</th>
            <th className={styles["pin-head"]}>Mark</th>
            <th className={styles["pin-head"]}>Delta</th>
          </tr>
        </thead>

        <tbody className={styles["table__body"]}>
          {sortedData.map((dataItem) => (
            <tr key={dataItem.objectId}>
              <th>{isoToDate(new Date(dataItem.time))}</th>
              <th>{dataItem.cycle}</th>
              <th>{dataItem.data.value}</th>
              <th>{dataItem.data.delta ? dataItem.data.delta.toFixed(4) : '-'}</th>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeformDataTable;