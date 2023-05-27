import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../store/title';

const Finances:React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitles({h1:'Minhas',h2:'QuikFinanças'}));
  },[dispatch])
  return (
    <main>
      <section>Finances</section>
    </main>
  );
};

export default Finances;