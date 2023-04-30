import React from 'react';
import styles from './Balance.module.css';

interface IBalance{
  balance: number;
}

const Balance:React.FC<IBalance> = ({balance}) => {
  return (
    <section className={styles.balance}>
      <h1>Saldo: <a href='#'><span>R$ {balance}</span></a></h1>
    </section>
  );
};

export default Balance;