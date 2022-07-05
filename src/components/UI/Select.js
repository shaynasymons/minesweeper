import React from 'react';
import classes from './Select.module.css';

const Select = props => { 
    return (
        <React.Fragment>
            <label htmlFor={props.id} className={classes.controls_select_label}>{props.label}</label>
            <select className={classes.controls_select} id={props.id} value={props.value} onChange={props.onChange}>
                {props.options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.text}
                    </option>
                ))}
            </select>
        </React.Fragment>
    );
}

export default Select;