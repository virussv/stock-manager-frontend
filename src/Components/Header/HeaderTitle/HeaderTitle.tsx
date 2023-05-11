import React, { useEffect, useState } from 'react';
import { ITitle } from '../../Header';
import styles from './HeaderTitle.module.css';

interface IHeaderTitleProps {
  states: {
    title: ITitle,
  }
};

const HeaderTitle:React.FC<IHeaderTitleProps> = ({states:{title}}) => {
  const [animeTitle,setAnimeTitle] = useState<boolean>(false);

  useEffect(() => {
    setAnimeTitle(true);
    setTimeout(() => {
      setAnimeTitle(false);
    }, 500);
  },[title]);

  return (
    <section className={`${styles.titles} ${animeTitle ? styles.active : ''}`}>
      <h1>{title.h1}</h1>
      <br/>
      <h2>{title.h2}</h2>
    </section>
  );
};

export default HeaderTitle;