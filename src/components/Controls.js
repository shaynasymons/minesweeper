import React from 'react';
import Select from './UI/Select';
import Button from './UI/Button';

import classes from './Controls.module.css';

const Controls = (props) => { 
    const modeOptions = [
        {value: 9, text: 'Beginner'},
        {value: 16, text: 'Intermediate'},
        {value: 25, text: 'Advanced'},
    ];
    
    return (
        <form className={classes.controls_form}>
            <Select label="Difficulty Level:" id="mode" value={props.mode} onChange={props.changeModeHandler} disabled={props.modeDisabled} options={modeOptions} />
            <Button type="button" text="New Game" onClick={props.resetGameHandler} />
        </form>
    );
}

export default Controls;