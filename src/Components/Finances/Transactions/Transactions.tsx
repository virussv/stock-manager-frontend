import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonAdd from '../../Helper/Modal/ButtonAdd/ButtonAdd';
import handleClickModal from '../../Helper/Modal/handleClick';
import modalHandler from '../../Helper/Modal/modalHandler';
import { setTitles } from '../../../store/title';
import Delete from '../helper/Delete/Delete';
import ModalConfirm from '../helper/ModalConfirm/ModalConfirm';
import ModalTransaction from './ModalTransactions/ModalTransactions';
import styles from './Transactions.module.css';

const Transactions:React.FC = () => {
	const dispatch = useDispatch();
	const [activeModal,setActiveModal] = useState<boolean>(false);
	const [enterModal,setEnterModal] = useState<boolean>(false);
	const [enterModalConfirm,setEnterModalConfirm] = useState<boolean>(false);
	const [activeModalConfirm,setActiveModalConfirm] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const buttonConfirmRef = useRef<HTMLButtonElement | null>(null);
	const mainRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		dispatch(setTitles({h1:'Minhas',h2:'QuikFinanças'}));
	},[dispatch]);

	useEffect(() => {
		modalHandler(activeModal,setEnterModal,buttonRef,mainRef);
	},[activeModal]);

	useEffect(() => {
		modalHandler(activeModalConfirm,setEnterModalConfirm,buttonConfirmRef,mainRef);
	},[activeModalConfirm]);

	return (
		<React.Fragment>
			<main className='animeTop' ref={mainRef}>
				<section className={`${styles.finances}`}>
					<div className={styles.headerComponent}>
						<div><ButtonAdd onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModal,setActiveModal)} id={styles.addTransaction} label={'Adicionar transação'} refButton={buttonRef}/></div>
						<div className={styles.payments}><Link to={'/financas/agendarpagamento'}>Pagar/Receber</Link></div>
					</div>

					<div className={styles.transactions}>
						<Delete position='right' onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModalConfirm,setActiveModalConfirm)} refButton={buttonConfirmRef}/>
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
						<Delete position='right' onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModalConfirm,setActiveModalConfirm)} refButton={buttonConfirmRef}/>
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

			{ enterModal && <ModalTransaction states={{ activeModal,setActiveModal }}/> }
			{ enterModalConfirm && <ModalConfirm states={{ activeModal:activeModalConfirm,setActiveModal:setActiveModalConfirm }} messages={{ message:'cool message cool',buttonMessage: 'submit' }}/> }
		</React.Fragment>
	);
};

export default Transactions;