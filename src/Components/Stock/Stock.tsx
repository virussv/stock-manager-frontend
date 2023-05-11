import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './Stock.module.css';
import shirt from './../../Assets/images/shirt.png';
import CreateProduct from './ModalCreateProduct/CreateProduct';

const Stock:React.FC = () => {
  const [activeModal,setActiveModal] = useState(false);
  const mainContent = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = document.querySelector('header');
    if(mainContent.current && header instanceof HTMLElement) {
      if(activeModal) {
        mainContent.current.classList.add('alpha');
        header.classList.add('alpha');  
      } else {
        mainContent.current.classList.remove('alpha');
        header.classList.remove('alpha'); 
      }
    }
  },[activeModal])

  //the span is the icon,but i check the button as well for accessibility scripts
  function handleClick({ target }:SyntheticEvent) {
    let button:HTMLButtonElement | undefined;
    if(target instanceof HTMLSpanElement) {
      button = target.parentNode as HTMLButtonElement;
    } else if(target instanceof HTMLButtonElement) {
      button = target as HTMLButtonElement;
    }

    if(button instanceof HTMLButtonElement) {
      setActiveModal((t) => !t);
      button.disabled = true;
      setTimeout(() => {
        button && (button.disabled = false);
      }, 500);
    }
  };

  return (
    <React.Fragment>
        <main className={styles.mainStockContent} ref={mainContent}>
        <section className={styles.stock}>
          <div>
            <button onClick={handleClick}><span className="material-symbols-outlined">add</span></button>
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
                    <button><span className='material-symbols-outlined'>edit</span></button>
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
      <CreateProduct states={{activeModal,setActiveModal}}/>
    </React.Fragment>
  );
};

export default Stock;