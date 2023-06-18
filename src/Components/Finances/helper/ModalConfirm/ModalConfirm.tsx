import React, { SyntheticEvent, useEffect, useRef } from 'react';
import ExitModal from '../../../Helper/Modal/ExitModal/ExitModal';
import handleOutSideClick from '../../../Helper/Modal/handleOutSideClick';
import styles from './ModalConfirm.module.css';

interface IModalConfirmProps {
  states: {
    activeModal: boolean,
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>,
  },
  messages: {
    message: string,
    buttonMessage: string
  }
} 

const ModalConfirm:React.FC<IModalConfirmProps> = ({ states:{ activeModal,setActiveModal },messages:{ message,buttonMessage } }) => {
	const modalRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		handleOutSideClick(activeModal,modalRef,setActiveModal);
	},[setActiveModal,activeModal]);

	function handleSubmit(event:SyntheticEvent) {
		event.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit} className={`modal ${styles.modalConfirm} ${activeModal ? styles.active : ''}`} ref={modalRef}>
			<ExitModal setActiveModal={setActiveModal}/>
			<p className={styles.message}>{message}</p>
			<button type='submit' className={styles.submit}>{buttonMessage}</button>
		</form>
	);
};

export default ModalConfirm;