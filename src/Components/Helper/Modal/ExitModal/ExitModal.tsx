import React from 'react';
import styles from './ExitModal.module.css';

interface IExitModalProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ExitModal:React.FC<IExitModalProps> = ({ setActiveModal }) => {
	function handleClickExitModal() {
		setActiveModal(false);
	}

	return (
		<button className={styles.exitModal} onClick={handleClickExitModal}><span className='material-symbols-outlined'>close</span></button>
	);
};

export default ExitModal;