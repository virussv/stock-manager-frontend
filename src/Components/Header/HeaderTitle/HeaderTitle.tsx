import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import styles from './HeaderTitle.module.css';

const HeaderTitle:React.FC = () => {
  const [activeAnimeTitle,setActiveAnimeTitle] = useState<boolean>(false);
  const { titles } = useSelector((state: RootState) => state);

  //first I check if there is something in h1 or h2, to activate my state to true, then I wait 500ms (title animation time) to change it to false, because when the title changes again I will set the state to true again, that is, the class to make the animation will be placed again in my section. It is necessary to validate if there is something in h1 or h2 for it not to activate the setTimeout twice, which would be the moment when the state starts and then when the state changes. It is necessary to activate it when changing the state, that is, the title.
  useEffect(() => {
    if(titles.h1 || titles.h2) {
      setActiveAnimeTitle(true);
      setTimeout(() => {
        setActiveAnimeTitle(false);
      }, 500);
    }
  },[titles]);

  return (
    <section className={`${styles.titles} ${activeAnimeTitle ? styles.active : ''}`}>
      <h1>{titles.h1}</h1>
      <br/>
      <h2>{titles.h2}</h2>
    </section>
  );
};

export default HeaderTitle;