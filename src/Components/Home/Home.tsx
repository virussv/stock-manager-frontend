import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../store/title';
import Balance from '../Finances/Balance/Balance';
import GeralContent from './GeralContent/GeralContent';

const Home:React.FC = () => {
	const dispatch = useDispatch();
  
	useEffect(() => {
		dispatch(setTitles({h1:'Olá',h2:'QuikWorkout'}));
	},[dispatch]);

	return (
		<main className='animeTop'>
			<Balance balance={1000}/>
			<GeralContent/>
		</main>
	);
};

export default Home;