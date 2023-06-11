function handleOutSideClick(
  activeModal:boolean,
  modalRef:React.MutableRefObject<HTMLFormElement | null>,
  setActiveModal:React.Dispatch<React.SetStateAction<boolean>>,
) {
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
}

export default handleOutSideClick;