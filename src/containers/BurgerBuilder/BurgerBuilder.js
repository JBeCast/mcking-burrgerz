import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  updatePurchaseState () {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
    .map(ingKey => ingredients[ingKey])
    .reduce((acc, amount) => acc + amount, 0);

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

  purchaseCancelHandler = _ => {
    this.setState({purchasing: false});
  }

  purchaseConfirmHandler = _ => {
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Joaco',
        email: 'test@test.com',
        address: {
          street: 'Test Street 1',
          zipCode: '9001',
          country: 'Tabarnia'
        },
        deliveryMethod: 'fastest'
      }
    }

    axios.post('orders.json', order)
      .then(res => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(err => {
        this.setState({loading: false, purchasing: false});
      });
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(res => {
        this.setState({ingredients: res.data});
      })
      .catch(err => {
        this.setState({error: true});
      });
  }

  render() {
    let orderSummary = null;
    let burger = this.state.error ? <p>Error: ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      )

      orderSummary = <OrderSummary
        price={this.state.totalPrice.toFixed(2)}
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseConfirmed={this.purchaseConfirmHandler}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        { burger }
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);