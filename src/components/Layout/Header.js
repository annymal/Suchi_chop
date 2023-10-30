import React from "react";
import styles from './Header.module.css'
import suchiImg from '../../assets/sushi.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
	return (<React.Fragment>
		<header styles={styles.header}>
			<h1>Япона Кухня</h1>
			<HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
		</header>
		<div className={styles['main-image']}>{/* когда в названии класса есть дефис, ставим так */}
			<img src={suchiImg} alt="блюдо"/>
		</div>
	</React.Fragment>

	)
}
export default Header;