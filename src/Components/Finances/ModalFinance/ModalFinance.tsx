import React, { SyntheticEvent, useEffect, useRef } from 'react';
import ExitModal from '../../../Helper/Modal/ExitModal';
import handleOutSideClick from '../../../Helper/Modal/handleOutSideClick';
import styles from './ModalFinance.module.css';

interface IModalFinanceProps {
  states: {
    activeModal: boolean,
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>,
  },
}

const ModalFinance:React.FC<IModalFinanceProps> = ({states:{activeModal,setActiveModal}}) => {
	const modalRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		handleOutSideClick(activeModal,modalRef,setActiveModal);
	},[setActiveModal,activeModal]);

	function handleSubmit(event:SyntheticEvent) {
		event.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit} className={`modal ${styles.modalFinance} ${activeModal ? styles.active : ''}`} ref={modalRef}>ModalFinance
			<ExitModal setActiveModal={setActiveModal}/>
		</form>
	);
};

export default ModalFinance;