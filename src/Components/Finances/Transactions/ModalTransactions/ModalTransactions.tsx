import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ButtonSubmit from '../../../../Helper/ButtonSubmit/ButtonSubmit';
import ExitModal from '../../../../Helper/Modal/ExitModal';
import handleOutSideClick from '../../../../Helper/Modal/handleOutSideClick';
import styles from './ModalTransactions.module.css';

interface IModalTransactionProps {
  states: {
    activeModal: boolean,
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>,
  },
}

type TCheckBoxProps = 'paid' | 'received';

const ModalTransaction:React.FC<IModalTransactionProps> = ({states:{activeModal,setActiveModal}}) => {
	const [checkbox,setCheckBox] = useState<TCheckBoxProps | null>(null); 
	const modalRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		handleOutSideClick(activeModal,modalRef,setActiveModal);
	},[setActiveModal,activeModal]);

	function handleSubmit(event:SyntheticEvent) {
		event.preventDefault();
	}

	function handleChange({ target }:SyntheticEvent) {
		if(target instanceof HTMLInputElement) {
			setCheckBox(target.value as TCheckBoxProps);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={`modal ${styles.modalFinance} ${activeModal ? styles.active : ''}`} ref={modalRef}>
			<ExitModal setActiveModal={setActiveModal}/>
			<div className={styles.nameInputContainer}>
				<label htmlFor='value'>Valor</label>
				<input type='number' id='value' className={styles.value}/>
				<label htmlFor='name'>{'Nome(lugar/pessoa)'}</label>
				<input type='text' id='name'/>
			</div>
			<div className={styles.checkBoxContainer}>
				<label htmlFor='paid'>
          Pago
					<input type='checkbox' id='paid' value='paid' checked={checkbox === 'paid'} onChange={handleChange}/>
					<span></span>
				</label>
				<label htmlFor='received'>
          Recebido
					<input type='checkbox' id='received' value='received' checked={checkbox === 'received'} onChange={handleChange}/>
					<span></span>
				</label>
			</div>
			<ButtonSubmit content='Enviar Transação' id={styles.submit}/>
		</form>
	);
};

export default ModalTransaction;