import React, { SyntheticEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

interface IMenuProps {
  states: {
    activeMenu: boolean,
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const Menu:React.FC<IMenuProps> = ({states: {activeMenu,setActiveMenu}}) => {
	const menuRef = useRef<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	function handleClick(event:SyntheticEvent):void {
		const button = event.target as HTMLButtonElement;
		button.disabled = true;
		setActiveMenu((t) => !t);
		setTimeout(() => {
			button.disabled = false;
			document.addEventListener('pointerdown',handleOutSideClick);
		}, 500);
	}

	function handleOutSideClick({target}:Event) {
		if(target instanceof Node) {
			if(!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
				setActiveMenu(false);
				document.removeEventListener('pointerdown',handleOutSideClick);
			}
		}
	}

	return (
		<React.Fragment>
			<button className={`${styles.menu_button} ${activeMenu ? styles.active : ''}`} onClick={handleClick} ref={buttonRef}>
			</button>
			<nav className={`${styles.nav} ${activeMenu ? styles.active : ''}`} ref={menuRef}>
				<ul className={styles.ul}>
					<li>
						<span className='material-symbols-outlined'>home</span>
						<Link onClick={() => setActiveMenu((t) => !t)} to={'/'}>Home</Link>
					</li>
					<span className={styles.line}></span>
					<li>
						<span className='material-symbols-outlined'>inventory_2</span>
						<Link onClick={() => setActiveMenu((t) => !t)} to={'/estoque'}>estoque</Link>
					</li>
					<span className={styles.line}></span>
					<li>
						<span className='material-symbols-outlined'>attach_money</span><Link onClick={() => setActiveMenu((t) => !t)} to={'/financas'}>Financas</Link></li>
					<li>
						<form>
							<button className={styles.logout}>Sair da Conta</button>
						</form>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
};

export default Menu;