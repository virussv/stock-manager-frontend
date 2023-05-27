import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../../store/title';

const StockDatas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitles({h1:'Meus',h2:'QuikDados'}));
  },[dispatch]);
  return (
    <div>StockDatas</div>
  );
};

export default StockDatas;