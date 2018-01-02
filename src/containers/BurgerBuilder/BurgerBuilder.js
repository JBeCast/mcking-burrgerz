import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState () {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
    .map(ingKey => ingredients[ingKey])
    .reduce((acc, amount) => acc + amount, 0);

    console.log(sum);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = type => {
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] + 1;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, this.updatePurchaseState);
  }

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] - 1;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, this.updatePurchaseState);
  }

  purchaseHandler = _ => {
    this.setState({purchasing: true});
  }

  render() {
    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientCount={this.state.ingredients}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;