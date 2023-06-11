/* eslint-disable indent */
import React, { useState } from 'react';
import styles from './Header.module.css';
import Menu from './Header/Menu/Menu';
import HeaderTitle from './Header/HeaderTitle/HeaderTitle';

const Header:React.FC = () => {
  const [activeMenu,setActiveMenu] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <HeaderTitle />
      <Menu states={{activeMenu,setActiveMenu}}/>
    </header>
  );
};

export default Header;