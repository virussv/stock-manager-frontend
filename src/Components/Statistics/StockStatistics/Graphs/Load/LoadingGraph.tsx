import React from 'react';
import Loading from '../../../../../Helper/Load/Load';
import styles from './LoadingGraph.module.css';

const Load = () => {
	return (
		<div className={styles.load}>
			<p>Carregando</p>
			<Loading stylesContainer={{marginTop:9}} styles={{height: 14,width: 14}}/>
		</div>
	);
};

export default Load;