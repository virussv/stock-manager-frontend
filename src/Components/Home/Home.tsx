import React from 'react';
import Balance from '../Finances/Balance/Balance';
import GeralContent from './GeralContent/GeralContent';

const Home:React.FC = () => {
  return (
    <main>
      <Balance balance={1000}/>
      <GeralContent/>
    </main>
  )
}

export default Home;