//the enterModal state serves as a condition to load the ModalProduct element, and the activeModal will activate the 'active' class in the ModalProduct to make its animation (it starts invisible) I separate it like this because if the activeModal is also a condition to load the html of the modalProduct the animation does not occur. Along with this logic I put timeouts to wait for the entry/exit animation to occur without problems
function modalHandler(
	activeModal:boolean,
	setEnterModal:React.Dispatch<React.SetStateAction<boolean>>,
	buttonRef:React.MutableRefObject<HTMLButtonElement | null>,
	mainRef: React.MutableRefObject<HTMLElement | null>,
) {
	//here i see if one of my modals is false and then I wait 500ms (the animation) to set my enterModal to false
	!activeModal && setTimeout(() => {
		setEnterModal(false);
	},500);

	//here i check the state of the modal to enabl;e or disable the buttons,i disable it so that when the modal opens the screen readers do not read what is behind the modal and also make it impossible to double click on the modal
	if(buttonRef.current) {
		if(activeModal) {
			buttonRef.current.disabled = true;
		} else if(!activeModal) {
			buttonRef.current.disabled = false;
		}
	}

	//here i put 'alpha' as a class in some html so that behind the modal it becomes opaque
	const header = document.querySelector('header');
	if(mainRef.current && header instanceof HTMLElement) {
		if(activeModal) {
			mainRef.current.classList.add('alpha');
			header.classList.add('alpha');  
		} else {
			mainRef.current.classList.remove('alpha');
			header.classList.remove('alpha'); 
		}
	}
}

export default modalHandler; 