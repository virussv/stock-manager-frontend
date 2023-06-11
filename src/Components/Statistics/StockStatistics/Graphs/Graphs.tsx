import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryPie } from 'victory';
import { RootState } from '../../../../store/configureStore';
import { setAnimeGraph } from '../../../../store/graph';
import styles from './Graphs.module.css';
import PropTypes from 'prop-types';

interface IGraphs {
  graph: 'pizza' | 'bar'
}

type TStyleAxisGraph = PropTypes.InferProps<{
  parent: PropTypes.Requireable<object>;
  axis: PropTypes.Requireable<object>;
  axisLabel: PropTypes.Requireable<object>;
  grid: PropTypes.Requireable<object>;
  ticks: PropTypes.Requireable<object>;
  tickLabels: PropTypes.Requireable<object>;
}>;

const Graphs:React.FC<IGraphs> = ({ graph }) => {
	const dispatch = useDispatch();
	//animeGraph slice
	const { sliceGraph } = useSelector((state:RootState) => state);
	const { animeGraph } = sliceGraph;
	//graph line style
	const styleAxis:TStyleAxisGraph = { tickLabels: { fill: 'white',fontSize: 32,fontWeight:600 },axis:{ stroke: '#6100c6',strokeWidth:2 } };

	//I say true for the animation, I wait 500ms (time it ends) and then I change it to false. Every time I change the selected graphic, it will animate
	useEffect(() => {
		dispatch(setAnimeGraph(true));
		setTimeout(() => {
			dispatch(setAnimeGraph(false));
		}, 500);
	},[dispatch,graph]);

	return (
		<section className={styles.graphContainer}>
			<div className={`${styles.graph} ${animeGraph ? 'animeTop' : ''}`}>
				{graph === 'bar' 
					? 
					<VictoryChart width={1300} height={1300}>
						<VictoryAxis dependentAxis={true} style={styleAxis}/>
						<VictoryAxis style={styleAxis}/>

						<VictoryBar sortOrder='descending' style={ { data:{ fill: 'white',width: 6} } }/>
					</VictoryChart> 
					:
					<VictoryPie  style={{labels:{fill:'white'}}}/>
				}
			</div>
		</section>
	);
};

export default Graphs;