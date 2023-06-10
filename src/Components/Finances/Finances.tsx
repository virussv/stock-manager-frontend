import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonAdd from '../../Helper/ButtonAdd/ButtonAdd';
import { setTitles } from '../../store/title';
import styles from './Finances.module.css';

const Finances:React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitles({h1:'Minhas',h2:'QuikFinanças'}));
  },[dispatch]);

  function handleClick() {

  }

  return (
    <main className='animeTop'>
      <section className={`${styles.finances}`}>
        <div className={styles.headerComponent}>
          <div><ButtonAdd onClick={handleClick} id={styles.addTransaction} label={'Adicionar transação'} htmlFor={styles.addTransaction}/></div>
          <div className={styles.payments}><Link to={'/pagamentos'}>À Pagar</Link></div>
          </div>


          <div className={styles.transactions}>
            <div className={styles.transaction}>
              <p className={`${styles.money} ${styles.received}`}>R$ 150,00</p>
              <p className={styles.personName}>cooltext</p>
            </div>

            <div className={styles.date}>
              <p className={styles.day}>9/12</p>
              <p className={styles.hour}>12:59</p>
            </div>
          </div>


          <div className={styles.transactions}>
            <div className={styles.transaction}>
              <p className={`${styles.money} ${styles.spent}`}>R$ 123,00</p>
              <p className={styles.personName}>cooltext</p>
            </div>

            <div className={styles.date}>
              <p className={styles.day}>9/12</p>
              <p className={styles.hour}>12:56</p>
            </div>
          </div>



      </section>
    </main>
  );
};

export default Finances;