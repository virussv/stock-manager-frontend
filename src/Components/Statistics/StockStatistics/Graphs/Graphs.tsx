import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';
import { RootState } from '../../../../store/configureStore';
import { setAnimeGraph } from '../../../../store/graph';
import styles from './Graphs.module.css';

interface IGraphs {
  graph: 'pizza' | 'bar'
}

const Graphs:React.FC<IGraphs> = ({ graph }) => {
  const dispatch = useDispatch();
  //animeGraph slice
  const { sliceGraph } = useSelector((state:RootState) => state);
  const { animeGraph } = sliceGraph;

  //I say true for the animation, I wait 500ms (time it ends) and then I change it to false. Every time I change the selected graphic, it will animate
  useEffect(() => {
    dispatch(setAnimeGraph(true));
    setTimeout(() => {
      dispatch(setAnimeGraph(false));
    }, 500);
  },[dispatch,graph]);

  function graphValuesTest() {
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
   <div className={`${styles.graphContainer} ${animeGraph ? 'animeTop' : ''}`}>
     {graph === 'bar' 
     ? 
        <VictoryChart>
          <VictoryBar data={graphValuesTest()}/>
        </VictoryChart> 
      :
        <VictoryPie />
      }
   </div>
  )
}

export default Graphs;