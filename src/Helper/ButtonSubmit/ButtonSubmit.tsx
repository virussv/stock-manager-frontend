import React from 'react';
import styles from './ButtonSubmit.module.css';

interface IButtonSubmitProps {
  content: string,
  id: string
}

const ButtonSubmit:React.FC<IButtonSubmitProps> = ({ content,id }) => {
	return (
		<button type='submit' className={styles.buttonSubmit} id={id}>{content}</button>
	);
};

export default ButtonSubmit;