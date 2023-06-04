import React, { CSSProperties } from 'react';
import style from './Load.module.css';

interface ILoadingProps {
  styles?: CSSProperties,
  stylesContainer?: CSSProperties,
}

const Load:React.FC<ILoadingProps> = ({ styles,stylesContainer }) => {
  return (
    <div className={`${style.loading}`} style={stylesContainer}>
      {[1,2,3].map((num) => {
        return <span key={num} style={styles}></span>
      })}
    </div>
  )
}

export default Load;