import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ButtonSubmit from '../../../../Helper/Modal/ButtonSubmit/ButtonSubmit';
import ExitModal from '../../../../Helper/Modal/ExitModal';
import handleOutSideClick from '../../../../Helper/Modal/handleOutSideClick';
import handleCheckBox from '../../helper/handleCheckBox';
import { TCheckBoxProps } from '../../helper/TCheckbox';
import styles from './ModalPayment.module.css';

interface IModalScheduleProps {
  states: {
    activeModal: boolean,
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>,
  },
}


const ModalPayments:React.FC<IModalScheduleProps> = ({ states:{ activeModal,setActiveModal } }) => {
	const [checkbox,setCheckBox] = useState<TCheckBoxProps | null>(null); 
	const modalRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		handleOutSideClick(activeModal,modalRef,setActiveModal);
	},[setActiveModal,activeModal]);

	function handleSubmit(event:SyntheticEvent) {
		event.preventDefault();
	}   

	return (
		<form onSubmit={handleSubmit} className={`modal ${styles.modalPayment} ${activeModal ? styles.active : ''}`} ref={modalRef}>
			<ExitModal setActiveModal={setActiveModal}/>

			<div className={styles.schedulePaymentContainer}>
				<label htmlFor='name'>{'Nome pessoa/lugar'}</label>
				<input type='text' id='name'/>
				<label htmlFor='value'>Valor</label>
				<input type='number' id='number'/>
				<label htmlFor='date'>date</label>
				<input type='date' />
			</div>

			<div className={styles.checkBoxContainer}>
				<label htmlFor='paid'>
          Á pagar
					<input type='checkbox' id='paid' value='paid' checked={checkbox === 'paid'} onChange={({ target }:SyntheticEvent) => handleCheckBox(target,setCheckBox)}/>
					<span></span>
				</label>
				<label htmlFor='received'>
          Á receber
					<input type='checkbox' id='received' value='received' checked={checkbox === 'received'} onChange={({ target }:SyntheticEvent) => handleCheckBox(target,setCheckBox)}/>
					<span></span>
				</label>
			</div>


			<ButtonSubmit content='Agendar Pagamento' id={styles.submit}/>
		</form>
	);
};

export default ModalPayments;