import React, { MouseEvent, SyntheticEvent, useRef, useState } from 'react';
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

const arraySizes:TSizeProps = ['m','p','g','gg'];

const CreateProduct:React.FC<ICreateProductProps> = ({states:{activeModal,setActiveModal}}) => {
  const modalRef = useRef<HTMLFormElement | null>(null);
  const loadingFile = useRef<HTMLDivElement | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  //this is product size.Here i don't type with TSizeprops because when i use the rest with value to be placed in setSizes it infers one more string in type, causing a bug because one more param was inferred
  const [sizes,setSizes] = useState<string[] | []>([]);
  //this is loadFile statement
  const [activeLoadFile,setActiveLoadFile] = useState<boolean>(false);
  //this is img display
  const [img,setImg] = useState<string | null>(null);
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
  function handleClickFile({ target }:MouseEvent) {
    setActiveLoadFile(true);
  }

  //input checkboxs
  function handleChangeCheckBox({ target }:SyntheticEvent) {
    if(target instanceof HTMLInputElement && arraySizes.includes(target.value)) {
      if(target.checked) {
        setSizes([...sizes,target.value]);
      } else {
        setSizes(sizes.filter((size) => size !== target.value));
      }
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

      <div className={styles.containerSizes}>
        <p>Tamanhos</p>
        <div className={styles.checkBox}>
          {arraySizes.map((size) => {
            return (
              <label key={size} htmlFor={size}>
                {size.toUpperCase()}
                <input type='checkbox' id={size} onChange={handleChangeCheckBox} value={size}/>
                <span className={styles.check}></span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.containerStock}>
        <label htmlFor='estoque'>Estoque</label>
        <input type='number' id='estoque'/>
      </div>

      <div className={styles.containerSales}>
        <label htmlFor='vendas'>Vendas</label>
        <input type='number' id='vendas'/>
      </div>
      
      <button type='submit' className={styles.submit}>Cadastar Camiseta</button>
    </form>
  )
}

export default CreateProduct;