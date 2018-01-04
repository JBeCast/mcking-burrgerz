import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={_ => props.ingredientAdded(ctrl.type)}
          removed={_ => props.ingredientRemoved(ctrl.type)}
          disabled={!props.ingredientCount[ctrl.type]}
        />
      ))}
      <button
        className={classes.orderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;