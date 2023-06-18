import React, { MouseEventHandler } from 'react';
import styles from './Delete.module.css';

interface IDeleteProps {
  position: 'right' | 'left',
  onClick: MouseEventHandler,
  refButton: React.LegacyRef<HTMLButtonElement> | null,
}

const Delete:React.FC<IDeleteProps> = ({ position,onClick,refButton }) => {


	return (
		<button onClick={onClick} ref={refButton} className={`${styles.button} ${position === 'left' ? styles.left : styles.right}`}><span className='material-symbols-outlined'>close</span></button>
	);
};

export default Delete;