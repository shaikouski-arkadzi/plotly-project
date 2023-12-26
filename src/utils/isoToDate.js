export const isoToDate = (date) => {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');

  let hours = `${date.getHours()}`.padStart(2,'0');
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = `${hours}:${minutes}`;
  return `${day}.${month}.${date.getFullYear()} ${strTime}`;
}