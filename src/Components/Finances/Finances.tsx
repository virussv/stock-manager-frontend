import React from 'react';
import { Route, Routes } from 'react-router';
import SchedulePayments from './SchedulePayments/SchedulePayments';
import Transactions from './Transactions/Transactions';

const Finances = () => {
	return (
		<Routes>
			<Route path='/' element={<Transactions />}/>
			<Route path='/agendarpagamento' element={<SchedulePayments />}/>
		</Routes>
	);
};

export default Finances;