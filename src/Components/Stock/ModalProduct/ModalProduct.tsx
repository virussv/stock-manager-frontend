
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './ModalProduct.module.css';
import camisa from '../../../Assets/images/shirt.png';
import Loading from '../../../Helper/Load/Load';

interface ICreateProductProps {
  states: {
    activeModal: boolean,
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>,
  },

  //this is for edit or create Product
  buttonTexts: {
    //i need change input message on css because the type input File is so bad for style,so i create other button with ::after on css,i change the message with "content:'something'"
    buttonImgText: 'create' | 'edit',
    buttonSendFormText: string,
  },
}

type TSizeProps = [
  m:string,
  p:string,
  g:string,
  gg:string,
];

type TStock = {
  m: { amount: number,sales: number, },
  p: { amount: number,sales: number, },
  g: { amount: number,sales: number, },
  gg: { amount: number,sales: number, },
};

const arrayProductSizes:TSizeProps = ['m','p','g','gg'];

const ModalProduct:React.FC<ICreateProductProps> = ({states:{activeModal,setActiveModal},buttonTexts:{buttonImgText,buttonSendFormText}}) => {
  const modalRef = useRef<HTMLFormElement | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  //this is loadFile statement
  const [activeLoadFile,setActiveLoadFile] = useState<boolean>(false);
  //this is img display
  const [img,setImg] = useState<string | null>(null);
  //this is stock amount count
  const [stock,setStock] = useState<TStock>({
    m: { amount: 0,sales: 0, },
    p: { amount: 0,sales: 0, },
    g: { amount: 0,sales: 0, },
    gg: { amount: 0,sales: 0, },
  });

  useEffect(() => {
    //here I check if the modal is active to add handleClickoutSIde,the timeout is to wait for the animation of the modal,
    if(activeModal) {
      setTimeout(() => {
        document.addEventListener('pointerdown',handleOutSideClickModal);
      }, 500);
    };

    //here I avoid an eventBubble and check if the click is inside the modal or outside to close the modal and remove the handleClickoutSide event, or if the click is inside the modal do nothing
    function handleOutSideClickModal(event:Event) {
      event.stopImmediatePropagation();
      if(!modalRef.current?.contains(event.target as Node)) {
        document.removeEventListener('pointerdown',handleOutSideClickModal);
        setActiveModal(false);
      };
    };
  },[setActiveModal,activeModal]);

  function handleClickExitModal() {
    setActiveModal(false);
  };

  //this is form submit
  function handleSubmit(event:SyntheticEvent) {
    event.preventDefault();
  };

  //here I manipulate the image loaded inside a state
  function handleChangeFile({ target }:SyntheticEvent) {
    if(target instanceof HTMLInputElement && target.files) {
      if(target.files[0]) {
        setActiveLoadFile(true);
        setImg(URL.createObjectURL(target.files[0]));
      };
    };
  };

  //file is loading
  function handleClickFile() {
    setActiveLoadFile(true);
  };

  //first I check if the target.id of the element exists within my state to have a correct value and know which input will be changed, then I check if the length entered is greater than 4 in the input, if so, I delete the characters above the limit, finally I confirm if the possible id values ​​are the same as my state and check which input is being triggered to change my 'amount' or 'sales'
  function handleChangeStock({ target }:SyntheticEvent) {
    if(target instanceof HTMLInputElement && target.id in stock) {
      if(target.value.length > 4) {
        target.value = target.value.substring(0,4);
      };
      const id = target.id as 'm' | 'p' | 'g' | 'gg';
      if(target.className === styles.amount) {
        setStock((stock) => ({...stock,[id]: { ...stock[id],amount: Number(target.value) }}));
      }
      if(target.className === styles.sales) {
        setStock((stock) => ({...stock,[id]: { ...stock[id],sales: Number(target.value) }}));
      }
    };
  };

  function sumStock(sum: 'amount' | 'sales') {
    const result = Object.values(stock).map((items) => {
      return items[sum];
    }).reduce((prevValue,currentValue) => {
      return prevValue + currentValue;
    });
    return result;
  }

  return (
    <form method='post' className={`modal ${styles.modalProduct} ${activeModal ? styles.active : ''}`} onSubmit={handleSubmit} ref={modalRef} encType='multipart-data'>
      <button className={styles.exitModal} onClick={handleClickExitModal}><span className='material-symbols-outlined'>close</span></button>
      <div className={styles.containerImg}>
        <input type='file' id='img' accept='.jpg,.png' className={`${activeLoadFile ? styles.active : ''} ${buttonImgText === 'create' ? styles.create : styles.edit}`} onClick={handleClickFile} onBlur={() => setActiveLoadFile(false)} onChange={handleChangeFile} ref={inputFile}/>
        <p>Sua imagem ficara assim:</p>
        <div className={styles.productPreview}>
          <img src={img ? img : camisa} alt='pré-visualização da camiseta' onLoad={() => setActiveLoadFile(false)}/>
        </div>

        {activeLoadFile && <Loading stylesContainer={{position:'absolute',top:'14px',left:'6px'}} styles={{height:6,width:6,backgroundColor:'white'}}/>}
      </div>

      <div className={styles.productSize}>
          <p>Tamanhos</p>
          <p>Estoque</p>
          <p>Vendas</p>
        {arrayProductSizes.map((size) => {
          return (
            <React.Fragment key={size}>
                <label htmlFor={size}>{size.toUpperCase()}</label>
                <input type='number' id={size} className={styles.amount} placeholder='0' onChange={handleChangeStock}/>
                <input type='number' id={size} className={styles.sales} placeholder='0' onChange={handleChangeStock}/>
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.datas}>
        <p className={styles.total}>Estoque Total:</p>
        <p className={styles.totalStock}>{sumStock('amount')}</p>
        <p>Vendas Totais:</p>
        <p>{sumStock('sales')}</p>
      </div>
      <button type='submit' className={styles.submit}>{buttonSendFormText}</button>
    </form>
  )
}

export default ModalProduct;