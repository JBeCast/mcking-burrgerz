import React from 'react';

import classes from './Input.css';

const input = props => {
  let inputElement = null;
  switch (props.inputtype) {
    case ('textarea'):
      inputElement = <textarea className={classes.InputElement} {...props}></textarea>
      break;
    case ('input'):
      inputElement = <input className={classes.InputElement} {...props} />
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props} />
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={inputElement} htmlFor="">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;