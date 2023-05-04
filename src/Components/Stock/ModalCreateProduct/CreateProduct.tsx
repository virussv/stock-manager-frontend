import React, { useRef } from 'react';
import styles from './CreateProduct.module.css';
import camisa from '../../../Assets/images/shirt.png';

interface ICreateProductProps {
  states: {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const CreateProduct:React.FC<ICreateProductProps> = ({states:{active,setActive}}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  //Here I don't use useEffect because a bug occurs, due to the instantaneous execution of the function even with a timeout, it would cause the removeEventListener to be triggered quickly because a pointer down was called outside the container at the time of the click
  function handleOutSideClick(event:Event) {
    if(!modalRef.current?.contains(event.target as Node)) {
      setActive(false);
      document.removeEventListener('pointerdown',handleOutSideClick);
    }
  }
  setTimeout(() => {
    document.addEventListener('pointerdown',handleOutSideClick);
  }, 500);


  return (
    <div className={`${styles.createProduct} ${active ? styles.active : ''}`} ref={modalRef}>
      <div className={styles.containerImg}>
        <input type='file' id='img'/>
        <p>Sua imagem ficara assim:</p>
        <img src={camisa} alt='pre-visualização da camiseta'/>
      </div>

      <div className={styles.containerSizes}>
        <p>Tamanhos</p>
        <div className={styles.checkBox}>
          <input type='checkbox' id='m'/>
          <label htmlFor='m'>M</label>
          <input type='checkbox' id='p'/>
          <label htmlFor='p' id='p'>P</label>
          <input type='checkbox' id='g'/>
          <label htmlFor='g' id='g'>G</label>
          <input type='checkbox' id='gg'/>
          <label htmlFor='gg' id='gg'>GG</label>
        </div>
      </div>

      <div className={styles.containerStock}>
        <label htmlFor='estoque'>Estoque</label>
        <input type='number' id='estoque'/>
      </div>

      <div className={styles.containerSales}>
        <label htmlFor='vendas'>Vendas</label>
        <input type='number' id='vendas'/>
      </div>
      
    </div>
  )
}

export default CreateProduct;