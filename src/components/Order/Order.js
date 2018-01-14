import React from 'react';
import classes from './Order.css';

const order = props => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName]
    });
  }

  const ingElements = ingredients.map(ing => <span
    style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }}
    key={ing.name}>{ing.name} ({ing.amount})
  </span>);
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingElements}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;