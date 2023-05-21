import React, { SyntheticEvent, useRef, useState } from 'react';
import styles from './CreateProduct.module.css';
import camisa from '../../../Assets/images/shirt.png';

interface ICreateProductProps {
  states: {
    activeModal: boolean,
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}

type TSizeProps = [
  m:string,
  p:string,
  g:string,
  gg:string,
];

type stockAmount = {
  m: number,
  p: number,
  g: number,
  gg: number,
}

const arrayProductSizes:TSizeProps = ['m','p','g','gg'];

const CreateProduct:React.FC<ICreateProductProps> = ({states:{activeModal,setActiveModal}}) => {
  const modalRef = useRef<HTMLFormElement | null>(null);
  const loadingFile = useRef<HTMLDivElement | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  //this is loadFile statement
  const [activeLoadFile,setActiveLoadFile] = useState<boolean>(false);
  //this is img display
  const [img,setImg] = useState<string | null>(null);
  //this is stock count
  const [stockAmount,setStockAmount] = useState<stockAmount>({
    m: 0,
    p: 0,
    g: 0,
    gg: 0,
  });


  //this is form submit
  function handleSubmit(event:SyntheticEvent) {
    event.preventDefault();
  }

  //input File
  function handleChangeFile({ target }:SyntheticEvent) {
    if(target instanceof HTMLInputElement && target.files) {
      if(target.files[0]) {
        //loading Image.After the state(setActiveLoadFile) change with the onLoad in img tag
        setActiveLoadFile(true);
        setImg(URL.createObjectURL(target.files[0]));
      }
    }
  }

  //input File
  function handleClickFile() {
    setActiveLoadFile(true);
  }

  //stock
  function handleChangeStock({ target }:SyntheticEvent) {
    if(target instanceof HTMLInputElement && target.id in stockAmount) {
      //verify the lenght of value
      if(target.value.length > 4) {
        target.value = target.value.substring(0,4);
      }
      //changing dinamicly the stock value
      const id = target.id as 'm' | 'p' | 'g' | 'gg';

      setStockAmount((stock) => ({...stock,[id]: Number(target.value)}));
    }
  }

  //Here I don't use useEffect because a bug occurs, due to the instantaneous execution of the function even with a timeout, it would cause the removeEventListener to be triggered quickly because a pointer down was called outside the container at the time of the click
  function handleOutSideClickModal({ target }:Event) {
    if(!modalRef.current?.contains(target as Node)) {
      setActiveModal(false);
      document.removeEventListener('pointerdown',handleOutSideClickModal);
    }
  }
  setTimeout(() => {
    document.addEventListener('pointerdown',handleOutSideClickModal);
  }, 500);

  return (
    <form method='post' className={`${styles.createProduct} ${activeModal ? styles.active : ''}`} onSubmit={handleSubmit} ref={modalRef} encType='multipart-data'>
      <div className={styles.containerImg}>
        <input type='file' id='img' accept='.jpg,.png' className={`${activeLoadFile ? styles.active : ''}`} onClick={handleClickFile} onBlur={() => setActiveLoadFile(false)} onChange={handleChangeFile} ref={inputFile}/>
        <p>Sua imagem ficara assim:</p>
        <div className={styles.productPreview}>
          <img src={img ? img : camisa} alt='pre-visualização da camiseta' onLoad={() => setActiveLoadFile(false)}/>
        </div>


        <div className={`${styles.loading} ${activeLoadFile ? styles.active : ''}`} ref={loadingFile}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={styles.containerStockSizes}>
          <p>Tamanhos</p>
          <p>Estoque</p>
        {arrayProductSizes.map((size) => {
          return (
            <React.Fragment key={size}>
                <label htmlFor={size}>{size.toUpperCase()}</label>
                <input type='number' id={size} placeholder='0' onChange={handleChangeStock}/>
            </React.Fragment>
          )
        })}
        <p className={styles.total}>Total:</p>
        <p className={styles.totalStock}>{Object.values(stockAmount).reduce((prevValue,currentValue) => {
          //sum the stock value
          return prevValue + currentValue;
        })}</p>
      </div>
      <button type='submit' className={styles.submit}>Cadastar Camiseta</button>
    </form>
  )
}

export default CreateProduct;