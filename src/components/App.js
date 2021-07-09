import '../styles/App.sass';
import { useState } from 'react';
import BonusList from './request';
import dayjs from 'dayjs';

function App() {
  const [filter, setFiler] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState(dayjs().format('YYYY-MM-DD'));

  function handleStartDate(evt) {
    setStartDate(evt.target.value)
  };
  
  function handleFinishDate(evt) {
    setFinishDate(evt.target.value)
  };
  
  function handleInput(evt) {
    setFiler(evt.target.value);
  };

  return (
    <div>
      <div className="bonusFilters">
        <input type="text" id="inputFilter" value={filter} onChange={handleInput} placeholder="Номер карты/ФИО"/>
        <div className="filterPeriod">
          {/* <button type="button" >ПОИСК</button> */}
          <span>Период</span>
          c <input type="date" id="inputFromDate" value={startDate} onChange={handleStartDate} /> 
          по <input type="date" id="inputToDate"  value={finishDate} onChange={handleFinishDate} /> 
        </div>
      </div>
      <div className="bonusContainer">
        <div className="bonusRow">
          <p>Номер карты</p>
          <p>ФИО</p>
          <p>%</p>
          <p>Номер телефона</p>
          <p>Дата рождения</p>
          <p>Сумма на начало периода</p>
          <p>Начисленно бонусов за перид</p>
          <p>Списанно бонусов за период</p>
          <p>Сумма на конец периода</p>
        </div>
        <BonusList startDate={startDate} finishDate={finishDate} filter={filter} />
      </div>
    </div>
  );
}

export default App;
