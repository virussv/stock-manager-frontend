import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import { setAnimeTitle } from '../../../store/title';
import styles from './HeaderTitle.module.css';

const HeaderTitle:React.FC = () => {
  const dispatch = useDispatch();
  const { animeTitle,titles } = useSelector((state: RootState) => state);

  //I start with dispatch saying true, thus placing the class to make the animation, after the animation is over (500ms) I set it to false, so I can animate again when changing pages, alternating between true and false
  useEffect(() => {
    dispatch(setAnimeTitle(true));
    setTimeout(() => {
      dispatch(setAnimeTitle(false));
    }, 500);
  },[dispatch,titles]);

  return (
    <section className={`${styles.titles} ${animeTitle ? styles.active : ''}`}>
      <h1>{titles.h1}</h1>
      <br/>
      <h2>{titles.h2}</h2>
    </section>
  );
};

export default HeaderTitle;