import styles from './Input.module.css'
import React from 'react';

const Input = React.forwardRef((props, ref) => {
	return (
		<div className={styles.input}>
			<label htmlFor={props.input.id}>{props.label}</label> 
			<input ref={ref} {...props.input} />
{/* 			все пары ключей и значений будут добавлены как пропс в инпут
 */}		</div>

	)
})
export default Input;