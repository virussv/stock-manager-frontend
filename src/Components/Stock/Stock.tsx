import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './Stock.module.css';
import shirt from './../../Assets/images/shirt.png';
import CreateProduct from './ModalCreateProduct/CreateProduct';

const Stock:React.FC = () => {
  const [active,setActive] = useState(false);
  const mainContent = useRef<HTMLElement>(null);

  useEffect(() => {
    if(mainContent.current) {
      mainContent.current.classList.toggle('alpha');

      const header = document.querySelector('header');
      header instanceof HTMLElement && header.classList.toggle('alpha');  
    } 
  },[active])

  function handleClick(event:SyntheticEvent) {
    if(event.target instanceof HTMLSpanElement) {
      const button = event.target.parentNode as HTMLButtonElement;
      setActive((t) => !t);
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, 500);
    };
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
      <CreateProduct states={{active,setActive}}/>
    </React.Fragment>
  );
};

export default Stock;