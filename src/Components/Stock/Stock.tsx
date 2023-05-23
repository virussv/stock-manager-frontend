import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './Stock.module.css';
import shirt from './../../Assets/images/shirt.png';
import ModalProduct from './ModalProduct/CreateProduct';


type TEnterModal = {
  modalCreateProduct: boolean,
  modalEditProduct: boolean,
}

const Stock:React.FC = () => {
  //enterModal is to say that the animation of the modal will start
  const [enterModal,setEnterModal] = useState<TEnterModal>({
    modalCreateProduct: false,
    modalEditProduct: false,
  });
  //when I say element loaded it means that the component is in the html, but it starts invisible to   make the animation, and it makes such animation with the activeModal...Product is true
  //here are the states to load the animation after the already loaded element,if I don't create these 2 types of states: entermodal and activeModal...Product there is only one dry entrance,without animation. Because if the element is loaded at the same time as the animation it does not occur.
  const [activeModalCreateProduct,setActiveModalCreateProduct] = useState<boolean>(false);
  const [activeModalEditProduct,setActiveModalEditProduct] = useState<boolean>(false);
  const mainContent = useRef<HTMLElement>(null);

  useEffect(() => {
    //for the exit with animation I put it in a timeout, with 500ms because it is the animation exit time.This time is necessary because the element will come out, but I want the animation first,as I already said
    !activeModalCreateProduct && setTimeout(() => {
      setEnterModal((modal) => ({...modal,modalCreateProduct:false}));
    },500);

    !activeModalEditProduct && setTimeout(() => {
      setEnterModal((modal) => ({...modal,modalEditProduct:false}));
    },500);
    
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
  },[activeModalCreateProduct,activeModalEditProduct])

  //here I check if the click is on the icon that is in span or in button, then I add an 'eventNone' class to avoid double clicks, and finally I check which modal should be activated
  function handleClick({ target }:SyntheticEvent) {
    //the span is the icon,but i check the button as well for accessibility scripts
    let button:HTMLButtonElement | undefined;
    let spanIcon: HTMLSpanElement | undefined;
    if(target instanceof HTMLSpanElement) {
      spanIcon = target;
      button = target.parentNode as HTMLButtonElement;
    } else if(target instanceof HTMLButtonElement) {
      button = target as HTMLButtonElement;
    }

    if(button instanceof HTMLButtonElement) {
      button.classList.add(`${styles.eventNone}`);
      spanIcon && (spanIcon.classList.add(`${styles.eventNone}`));
      setTimeout(() => {
        button && button.classList.remove(`${styles.eventNone}`);
        spanIcon && (spanIcon.classList.remove(`${styles.eventNone}`));
      }, 500);

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
            <button onClick={handleClick} id={styles.createProduct} ><span className="material-symbols-outlined">add</span></button>
            <p>Adicionar Produto</p>
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
                    <button onClick={handleClick} id={styles.editProduct}><span className='material-symbols-outlined'>edit</span></button>
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

      {(enterModal.modalEditProduct) && <ModalProduct states={{activeModal:activeModalEditProduct,setActiveModal:setActiveModalEditProduct}} buttonTexts={{buttonImgText:'edit',buttonSendFormText:'Editar Camiseta'}}/>}

    </React.Fragment>
  );
};

export default Stock;