import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

interface IMenuProps {
  states: {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const Menu:React.FC<IMenuProps> = ({states: {active,setActive}}) => {
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
          <li>
            <span className='material-symbols-outlined'>home</span>
            <Link onClick={() => setActive((t) => !t)} to={'/'}>Home</Link>
          </li>
          <span className={styles.line}></span>
          <li>
            <span className='material-symbols-outlined'>inventory_2</span>
            <Link onClick={() => setActive((t) => !t)} to={'/estoque'}>estoque</Link>
          </li>
          <span className={styles.line}></span>
          <li>
            <span className='material-symbols-outlined'>attach_money</span><Link onClick={() => setActive((t) => !t)} to={'/financas'}>Financas</Link></li>
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