import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  updatePurchaseState () {
    const ingredients = {
      ...this.props.ingredients
    };
    const sum = Object.keys(ingredients)
    .map(ingKey => ingredients[ingKey])
    .reduce((acc, amount) => acc + amount, 0);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = type => {
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.props.ingredients };
    updatedIngredients[type] = this.props.ingredients[type] + 1;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, this.updatePurchaseState);
  }

  removeIngredientHandler = type => {
    if (this.props.ingredients[type] <= 0) return;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.props.ingredients };
    updatedIngredients[type] = this.props.ingredients[type] - 1;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, this.updatePurchaseState);
  }

  purchaseHandler = _ => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = _ => {
    this.setState({purchasing: false});
  }

  purchaseConfirmHandler = _ => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
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

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            ingredientCount={this.props.ingredients}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = <OrderSummary
        price={this.state.totalPrice.toFixed(2)}
        ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredient => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
    removeIngredient: ingredient => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
