import React, { useEffect, useState } from 'react';
import styles from './HeaderTitle.module.css';

interface IHeaderTitleProps {
  titles: {
    h1: string,
    h2: string,
  };
};

const HeaderTitle:React.FC<IHeaderTitleProps> = ({titles: {h1,h2}}) => {
  const [animeTitle,setAnimeTitle] = useState<boolean>(false);
  useEffect(() => {
    setAnimeTitle(true);
    setTimeout(() => {
      setAnimeTitle(false);
    }, 500);
  },[h1,h2]);

  return (
    <section className={`${styles.titles} ${animeTitle ? styles.active : ''}`}>
      <h1>{h1}</h1>
      <br />
      <h2>{h2}</h2>
    </section>
  );
};

export default HeaderTitle;