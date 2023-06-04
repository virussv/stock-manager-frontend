import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../../store/title';
import Load from './Graphs/Load/LoadingGraph';
import styles from './StockStatistics.module.css';
const Graphs = React.lazy(() => import('./Graphs/Graphs'));

type TValueStats = 'week' | 'days' | 'month' | 'weekDays';
type TValueGraphs = 'pizza' | 'bar';

const StockStatistic:React.FC = () => {
  const dispatch = useDispatch();
  //filter statistics
  const [valueStats,setValueStats] = useState<TValueStats>('week');
  //choice a graph
  const [valueGraphs,setValueGraphs] = useState<TValueGraphs>('pizza');

  useEffect(() => {
    dispatch(setTitles({h1:'Meus',h2:'QuikDados'}));
  },[dispatch]);

  return (
    <section className={`animeTop ${styles.container}`}>
      <div className={styles.filters}>
        <select name='stats' onChange={({ target }) => setValueStats(target.value as TValueStats)}>
          <option value='week'>Por semana</option>
          <option value='days'>Por dias</option>
          <option value='month'>Por mês</option>
          <option value='weekdays'>Por dias da semana</option>
        </select>

        <select name='graphs' onChange={({ target }) => setValueGraphs(target.value as TValueGraphs)}>
          <option value='pizza'>Pizza</option>
          <option value='bar'>Barra</option>
        </select>
      </div>

      <React.Suspense fallback={<Load />}>
        <Graphs graph={valueGraphs}/>
      </React.Suspense>
    </section>
  );
};

export default StockStatistic;