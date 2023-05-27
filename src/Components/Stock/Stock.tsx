import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './Stock.module.css';
import shirt from './../../Assets/images/shirt.png';
import ModalProduct from './ModalProduct/ModalProduct';
import { useDispatch } from 'react-redux';
import { setTitles } from '../../store/title';
import { Link } from 'react-router-dom';

type TEnterModal = {
  modalCreateProduct: boolean,
  modalEditProduct: boolean,
};

const Stock:React.FC = () => {
  const dispatch = useDispatch();
  //enterModal is to say that the animation of the modal will start
  const [enterModal,setEnterModal] = useState<TEnterModal>({
    modalCreateProduct: false,
    modalEditProduct: false,
  });
  //when I say element loaded it means that the component is in the html, but it starts invisible to make the animation, and it makes such animation with the activeModal...Product is true
  //here are the states to load the animation after the already loaded element,if I don't create these 2 types of states: entermodal and activeModal...Product there is only one dry entrance,without animation. Because if the element is loaded at the same time as the animation it does not occur.
  const [activeModalCreateProduct,setActiveModalCreateProduct] = useState<boolean>(false);
  const [activeModalEditProduct,setActiveModalEditProduct] = useState<boolean>(false);
  const mainContent = useRef<HTMLElement>(null);
  const buttonAddRef = useRef<HTMLButtonElement | null>(null);
  const buttonEditRef = useRef<HTMLButtonElement | null>(null);

  //here I check the state of the modal to enable or disable the buttons . I disable it so that when the modal opens screen readers do not read what is behind the modal and make it impossible to double click on the modal
  useEffect(() => {
    dispatch(setTitles({h1: 'Meu',h2:'QuikEstoque'}));
    !activeModalCreateProduct && setTimeout(() => {
      setEnterModal((modal) => ({...modal,modalCreateProduct:false}));
    },500);
    !activeModalEditProduct &&  setTimeout(() => {
      setEnterModal((modal) => ({...modal,modalEditProduct:false}));
    },500);

    if(buttonAddRef.current && buttonEditRef.current) {
      if(activeModalCreateProduct || activeModalEditProduct) {
        buttonAddRef.current.disabled = true;
        buttonEditRef.current.disabled = true;
      } else if(!activeModalCreateProduct && !activeModalEditProduct) {
        buttonAddRef.current.disabled = false;
        buttonEditRef.current.disabled = false;
      }
    }
    
    //here I add an 'alpha' class for the background of the modal to be opaque
    const header = document.querySelector('header');
    if(mainContent.current && header instanceof HTMLElement) {
      if(activeModalCreateProduct || activeModalEditProduct) {
        mainContent.current.classList.add('alpha');
        header.classList.add('alpha');  
      } else {
        mainContent.current.classList.remove('alpha');
        header.classList.remove('alpha'); 
      }
    }
  },[dispatch,activeModalCreateProduct,activeModalEditProduct]);

  //here I check if the click is on the icon that is in span or in button, then I add an 'eventNone' class to avoid double clicks, and finally I check which modal should be activated
  function handleClick({ target }:SyntheticEvent) {
    //the span is the icon but i also check the button for screen readers
    let button:HTMLButtonElement | undefined;
    if(target instanceof HTMLSpanElement) {
      button = target.parentNode as HTMLButtonElement;
    } else if(target instanceof HTMLButtonElement) {
      button = target as HTMLButtonElement;
    }

    if(button instanceof HTMLButtonElement) {
      //again,here the timeout callback, as I said, to first say that the element will load, and then with a timeout callback to load the animation
      if(button.id === styles.createProduct) {
        setEnterModal((modal) => ({...modal,modalCreateProduct: true}));
        setTimeout(() => {
          setActiveModalCreateProduct(true);
        });
      } else if(button.id === styles.editProduct) {
        setEnterModal((modal) => ({...modal,modalEditProduct: true}));
        setTimeout(() => {
          setActiveModalEditProduct(true);
        });
      }
    }
  };

  return (
    <React.Fragment>
        <main className={styles.mainStockContent} ref={mainContent}>
        <section className={styles.stock}>
          <div>
            <div>
              <button onClick={handleClick} id={styles.createProduct} ref={buttonAddRef}><span className={`material-symbols-outlined`}>add</span></button>
              <label htmlFor={styles.createProduct}>Adicionar Produto</label>
            </div>
            <div className={styles.data}><Link to={'/dados/estoque'}>Dados</Link></div>
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
                    <button onClick={handleClick} id={styles.editProduct} ref={buttonEditRef}><span className={`material-symbols-outlined $`}>edit</span></button>
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
      
      {(enterModal.modalCreateProduct) && <ModalProduct states={{activeModal:activeModalCreateProduct,setActiveModal:setActiveModalCreateProduct}} buttonTexts={{buttonImgText:'create',buttonSendFormText:'Cadastrar Camiseta'}}/>}

      {(enterModal.modalEditProduct) && <ModalProduct states={{activeModal:activeModalEditProduct,setActiveModal:setActiveModalEditProduct}} buttonTexts={{buttonImgText:'edit',buttonSendFormText:'Editar Dados'}}/>}

    </React.Fragment>
  );
};

export default Stock;