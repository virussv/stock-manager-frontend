import React from 'react';
import style from './Header-title.module.css';

interface Ititles {
  titles: {
    h1: string,
    h2: string
  }
}

const Page:React.FC<Ititles> = ({titles: {h1,h2}}) => {
  return (
    <section className={style.titles}>
      <h1>{h1}</h1>
      <br />
      <h2>{h2}</h2>
    </section>
  )
}

export default Page;