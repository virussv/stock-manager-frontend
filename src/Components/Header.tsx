import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Menu from './Header/Menu/Menu';
import HeaderTitle from './Header/HeaderTitle/HeaderTitle';
import { useLocation } from 'react-router';

export interface ITitle {
  h1:string,h2:string
}

const Header:React.FC = () => {
  const [activeMenu,setActiveMenu] = useState<boolean>(false);
  const [title,setTitle] = useState<ITitle | undefined>();
  const titleURL = useLocation().pathname.replace('/','');


  useEffect(() => {
    switch (titleURL) {
      case 'estoque':
        setTitle({h1:'Meu',h2:'QuikEstoque'});
        break;
      case 'financas':
        setTitle({h1:'Minhas',h2:'QuikFinanças'});
        break;
      default: 
        setTitle({h1:'Olá',h2:'Quikworkout'})
        break;
    }
  },[titleURL]);

  return (
    <header className={styles.header}>
      {title && <HeaderTitle states={{title}}/>}
      <Menu states={{activeMenu,setActiveMenu}}/>
    </header>
  )
}

export default Header;