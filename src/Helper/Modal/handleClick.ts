function handleClickModal(
  target:EventTarget,
  setEnterModal:React.Dispatch<React.SetStateAction<boolean>>,
  setActiveModal:React.Dispatch<React.SetStateAction<boolean>>
) {
 //the span is the icon but i also check the button for screen readers
 let button:HTMLButtonElement | undefined;
 if(target instanceof HTMLSpanElement) {
   button = target.parentNode as HTMLButtonElement;
 } else if(target instanceof HTMLButtonElement) {
   button = target as HTMLButtonElement;
 }

 if(button instanceof HTMLButtonElement) {
   //first I load the element with enterModal and then I put my setActiveModal in a timeout so that it waits a bit and then I put the animation class.to better understand the logic of two states I explained in 'modalHandler.ts'
   setEnterModal(true);
   setTimeout(() => {
     setActiveModal(true);
   });
 }

}

export default handleClickModal;