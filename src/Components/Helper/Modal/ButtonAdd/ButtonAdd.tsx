import React, { LegacyRef, MouseEventHandler } from 'react';
import styles from './ButtonAdd.module.css';

interface IButtonAddProps {
  onClick: MouseEventHandler,
  id: string,
  refButton?: LegacyRef<HTMLButtonElement>,
  label: string,
}

const ButtonAdd:React.FC<IButtonAddProps> = ({ id,refButton=null,label,onClick }) => {
	return (
		<React.Fragment>
			<button onClick={onClick} id={id} className={styles.buttonAdd} ref={refButton}><span className='material-symbols-outlined'>add</span></button>
			<label htmlFor={id} className={styles.label}>{label}</label>
		</React.Fragment>
	);
};

export default ButtonAdd;