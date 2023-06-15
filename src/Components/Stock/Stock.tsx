import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './Stock.module.css';
import shirt from './../../Assets/images/shirt.png';
import ModalProduct from './ModalProduct/ModalProduct';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../store/title';
import { Link } from 'react-router-dom';
import ButtonAdd from '../../Helper/ButtonAdd/ButtonAdd';
import modalHandler from '../../Helper/Modal/modalHandler';
import handleClickModal from '../../Helper/Modal/handleClick';

const Stock:React.FC = () => {
	const dispatch = useDispatch();
	//here I have two enterModal and two activeModal, because one modal is for creating products and the other for editing
	const [enterModalCreateProduct,setEnterModalCreateProduct] = useState<boolean>(false);
	const [enterModalEditProduct,setEnterModalEditProduct] = useState<boolean>(false); 
	const [activeModalCreateProduct,setActiveModalCreateProduct] = useState<boolean>(false);
	const [activeModalEditProduct,setActiveModalEditProduct] = useState<boolean>(false);
	const mainRef = useRef<HTMLElement | null>(null);
	const buttonAddRef = useRef<HTMLButtonElement | null>(null);
	const buttonEditRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		dispatch(setTitles({h1: 'Meu',h2:'QuikEstoque'}));
	},[dispatch]);

	useEffect(() => {    
		modalHandler(activeModalCreateProduct,setEnterModalCreateProduct,buttonAddRef,mainRef);
	},[activeModalCreateProduct]);

	useEffect(() => {    
		modalHandler(activeModalEditProduct,setEnterModalEditProduct,buttonEditRef,mainRef);
	},[activeModalEditProduct]);

	return (
		<React.Fragment>
			<main className='animeTop' ref={mainRef}>
				<section className={`${styles.stock}`}>
					<div>
						<div>
							<ButtonAdd onClick={({ target }:SyntheticEvent) => handleClickModal(target,setEnterModalCreateProduct,setActiveModalCreateProduct)} id={styles.createProduct} refButton={buttonAddRef} label={'Adicionar Produto'} />
						</div>
						<div className={styles.data}><Link to={'/estatisticas/estoque'}>Estatísticas</Link></div>
					</div>
					<table className={styles.stockTable}>
						<thead>
							<tr>
								<th>Roupas</th>
								<th>Tamanhos</th>
								<th>Estoque</th>
								<th>Vendas</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<button onClick={({ target }:SyntheticEvent) => 
										handleClickModal(target,setEnterModalEditProduct,setActiveModalEditProduct)} id={styles.editProduct} ref={buttonEditRef}><span className={'material-symbols-outlined'}>edit</span></button>
									<img src={shirt} alt='camiseta' className={styles.productImage}/>
								</td>
								<td>M P G GG</td>
								<td>7</td>
								<td>3</td>
							</tr>
						</tbody>
					</table>
				</section>
			</main>
      
			{ enterModalCreateProduct && <ModalProduct states={{activeModal:activeModalCreateProduct,setActiveModal:setActiveModalCreateProduct}} buttonTexts={{buttonImgText:'create',buttonSendFormText:'Cadastrar Camiseta'}}/> }

			{ enterModalEditProduct && <ModalProduct states={{activeModal:activeModalEditProduct,setActiveModal:setActiveModalEditProduct}} buttonTexts={{buttonImgText:'edit',buttonSendFormText:'Editar Dados'}}/> }

		</React.Fragment>
	);
};

export default Stock;