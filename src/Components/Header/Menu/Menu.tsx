import React, { SyntheticEvent, useState } from 'react';
import styles from './Menu.module.css';

const Menu:React.FC = () => {
  const [active,setActive] = useState<boolean>(false);
  function handleClick(event:SyntheticEvent):void {
    const button = event.target as HTMLButtonElement;
    button.style.pointerEvents = 'none';
    setActive((t) => !t);
    setTimeout(() => {
      button.style.pointerEvents = 'initial';
    }, 500);
  } 

  return (
    <React.Fragment>
      <button className={`${styles.menu_button} ${active ? styles.active : ''}`} onClick={handleClick}>
      </button>
      <nav className={`${styles.nav} ${active ? styles.active : ''}`}>
        <ul className={styles.ul}>
          <li><span className='material-symbols-outlined'>inventory_2</span><a href='#'>Meu estoque</a></li>
          <span className={styles.line}></span>
          <li><span className='material-symbols-outlined'>attach_money</span><a href='#'>Finanças</a></li>
          <li>
            <form>
              <button className={styles.logout}>Sair da Conta</button>
            </form>
          </li>
        </ul>
      </nav>
  </React.Fragment>
  )
}

export default Menu;