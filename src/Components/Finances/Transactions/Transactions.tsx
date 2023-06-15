import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonAdd from '../../../Helper/ButtonAdd/ButtonAdd';
import handleClickModal from '../../../Helper/Modal/handleClick';
import modalHandler from '../../../Helper/Modal/modalHandler';
import { setTitles } from '../../../store/title';
import styles from './Transactions.module.css';
import ModalFinance from './Transactions.module.css';

const Transactions:React.FC = () => {
	const dispatch = useDispatch();
	const [activeModal,setActiveModal] = useState<boolean>(false);
	const [enterModal,setEnterModal] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const mainRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		dispatch(setTitles({h1:'Minhas',h2:'QuikFinanças'}));
	},[dispatch]);

	useEffect(() => {
		modalHandler(activeModal,setEnterModal,buttonRef,mainRef);
	},[activeModal]);

	return (
		<React.Fragment>
			<main className='animeTop' ref={mainRef}>
				<section className={`${styles.finances}`}>
					<div className={styles.headerComponent}>
						<div><ButtonAdd onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModal,setActiveModal)} id={styles.addTransaction} label={'Adicionar transação'} refButton={buttonRef}/></div>
						<div className={styles.payments}><Link to={'/financas/agendarpagamento'}>Pagar/Receber</Link></div>
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

			{ enterModal && <ModalFinance states={{ activeModal,setActiveModal }}/> }
		</React.Fragment>
	);
};

export default Transactions;