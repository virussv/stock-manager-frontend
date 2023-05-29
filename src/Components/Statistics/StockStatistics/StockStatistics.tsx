import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../../store/title';
import { VictoryBar, VictoryChart } from 'victory';
import styles from './StockStatistics.module.css';

const StockStatistic = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitles({h1:'Meus',h2:'QuikDados'}));
  },[dispatch]);

  function ob() {
    let a:{}[] = [];
    for (let i = 0; i < 10; i++) {
      a.push({
        y: `semana${i}`,
        x: `${i}`
      });
    }
  return a;
  }

  return (
    <section className='animeTop'>
      <div className={styles.filters}>
        <select name="" id="">
          <option value='week'>Por semana</option>
          <option value='days'>Por dias</option>
          <option value='month'>Por mês</option>
          <option value='weekdays'>Por dias da semana</option>
        </select>
      </div>

      <div className={styles.graphs}>
        <VictoryChart>
          <VictoryBar data={ob()}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default StockStatistic;