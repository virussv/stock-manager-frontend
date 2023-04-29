import React from 'react';
import styles from './Header.module.css';
import Menu from './Header/Menu/Menu';
import Page from './Header/Header-title/Header-title';

const Header:React.FC = () => {
  return (
    <header className={styles.header}>
      <Page titles={{h1:'Olá',h2:'Quikworkout'}}/>
      <Menu />
    </header>
  )
}

export default Header;