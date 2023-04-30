import React, { useState } from 'react';
import styles from './Header.module.css';
import Menu from './Header/Menu/Menu';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import { useLocation } from 'react-router';

const Header:React.FC = () => {
  const [active,setActive] = useState<boolean>(false);
  const location = useLocation().pathname.replace('/','');

  function getTitle():{h1: string,h2: string} {
    const title = location;
    
    switch (title) {
      case 'estoque':
        return {h1:'Meu',h2:'QuikEstoque'}
        case 'financas':
          return {h1:'Minhas',h2:'QuikFinanças'}
      default: 
        return {h1:'Olá',h2:'Quikworkout'}
    };
  };

  return (
    <header className={styles.header}>
      <HeaderTitle titles={{...getTitle()}}/>
      <Menu states={{active,setActive}}/>
    </header>
  )
}

export default Header;