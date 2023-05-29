import React from 'react';
import { Route, Routes } from 'react-router';
import StockStatistic from './StockStatistics/StockStatistics';

const Statistics = () => {
  return (
    <Routes>
      <Route path='estoque' element={<StockStatistic />}/>
    </Routes>
  );
};

export default Statistics;