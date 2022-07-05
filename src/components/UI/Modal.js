import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

import classes from './Modal.module.css';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = props => { 
    return (
        <div className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button type="button" onClick={props.onConfirm} text={props.buttontext} />
            </footer>
        </div>
    );
};

const Modal = props => {
  return (
      <React.Fragment>
          {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
          {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} buttontext={props.buttontext} />, document.getElementById('overlay-root'))}
      </React.Fragment>
  );
};

export default Modal;