import React from 'react';
import classes from './Button.module.css';

const Button = props => { 
    return (
        <button type={props.type} className={classes.controls_button} onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default Button;