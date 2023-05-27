import React from 'react';
import { Route, Routes } from 'react-router';
import StockDatas from './StockDatas/StockDatas';

const Datas = () => {
  return (
    <Routes>
      <Route path='estoque' element={<StockDatas />}/>
    </Routes>
  );
};

export default Datas;