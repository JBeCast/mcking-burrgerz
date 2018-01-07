import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'


const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => {
      return <li key={ingKey}><span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
    })
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total price: <strong>{props.price}</strong> </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.purchaseConfirmed} btnType="Success">CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary