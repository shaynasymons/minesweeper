import React from 'react';
import classes from './Select.module.css';

const Select = props => { 
    return (
        <React.Fragment>
            <label htmlFor={props.id} className={classes.select_label}>{props.label}</label>
            <select className={classes.select} id={props.id} value={props.value} onChange={props.onChange} disabled={props.disabled}>
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