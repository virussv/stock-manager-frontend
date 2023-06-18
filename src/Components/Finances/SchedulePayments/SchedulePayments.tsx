import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonAdd from '../../Helper/Modal/ButtonAdd/ButtonAdd';
import handleClickModal from '../../Helper/Modal/handleClick';
import modalHandler from '../../Helper/Modal/modalHandler';
import { setTitles } from '../../../store/title';
import Delete from '../helper/Delete/Delete';
import ModalConfirm from '../helper/ModalConfirm/ModalConfirm';
import ModalPayments from './ModalPayments/ModalPayment';
import styles from './SchedulePayments.module.css';

const SchedulePayments = () => {
	const dispatch = useDispatch();
	const [activeModal,setActiveModal] = useState<boolean>(false);
	const [enterModal,setEnterModal] = useState<boolean>(false);
	const [enterModalConfirm,setEnterModalConfirm] = useState<boolean>(false);
	const [activeModalConfirm,setActiveModalConfirm] = useState(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const buttonCheckRef = useRef<HTMLButtonElement | null>(null);
	const buttonDeleteRef = useRef<HTMLButtonElement | null>(null);
	const mainRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		dispatch(setTitles({h1:'Meus',h2:'QuikPagamentos'}));
	},[dispatch]);

	useEffect(() => {
		modalHandler(activeModal,setEnterModal,buttonRef,mainRef);
	},[activeModal]);

	useEffect(() => {
		modalHandler(activeModalConfirm,setEnterModalConfirm,buttonCheckRef,mainRef);
	},[activeModalConfirm]);

	return (
		<React.Fragment>
			<main className='animeTop' ref={mainRef}>
				<section className={`${styles.payments}`}>
					<div className={styles.headerComponent}>
						<div><ButtonAdd onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModal,setActiveModal)} id={styles.addPayment} label={'Adicionar Pagamento'} refButton={buttonRef}/></div>
					</div>

					<div className={styles.schedulePayments}>
						<Delete position='left' onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModalConfirm,setActiveModalConfirm)} refButton={buttonDeleteRef}/>
						<button onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModalConfirm,setActiveModalConfirm)} className={styles.checkButton} ref={buttonCheckRef}><span className='material-symbols-outlined'>check</span></button>
						<div className={styles.payment}>
							<p><span className={styles.green}>Devedor:</span> zeroberto</p>
							<p className={styles.value}><span className={styles.green}>Valor:</span> R$150,00</p>
						</div>

						<div className={styles.date}>
							<p>Data a Receber: 9/7</p>
						</div>
					</div>

					<div className={styles.schedulePayments}>
						<Delete position='left' onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModalConfirm,setActiveModalConfirm)} refButton={buttonDeleteRef}/>
						<button onClick={({target}:SyntheticEvent) => handleClickModal(target,setEnterModalConfirm,setActiveModalConfirm)} className={styles.checkButton} ref={buttonCheckRef}><span className='material-symbols-outlined'>check</span></button>
						<div className={styles.payment}>
							<p><span className={styles.red}>Devendo:</span> zeroberto</p>
							<p className={styles.value}><span className={styles.red}>Valor:</span> R$90,00</p>
						</div>

						<div className={styles.date}>
							<p>Data a Pagar: 13/7</p>
						</div>
					</div>
				</section>
			</main>

			{ enterModal && <ModalPayments states={{ activeModal,setActiveModal }}/>}
			{ enterModalConfirm && <ModalConfirm states={{ activeModal:activeModalConfirm,setActiveModal:setActiveModalConfirm }} messages={{ message:'cool message cool',buttonMessage: 'submit' }}/> }
		</React.Fragment>
	);
};

export default SchedulePayments;