import { TCheckBoxProps } from './TCheckbox';

function handleCheckBox(target:EventTarget,setCheckBox: React.Dispatch<React.SetStateAction<TCheckBoxProps | null>>) {
	if(target instanceof HTMLInputElement) {
		setCheckBox(target.value as TCheckBoxProps);
	}
}

export default handleCheckBox;