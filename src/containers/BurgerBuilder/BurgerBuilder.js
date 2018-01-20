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

import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
  state = {
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

    return sum > 0;
  }

  purchaseHandler = _ => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = _ => {
    this.setState({purchasing: false});
  }

  purchaseConfirmHandler = _ => {
    this.props.history.push('/checkout');
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
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = <OrderSummary
        price={this.props.totalPrice.toFixed(2)}
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredient => dispatch(actions.addIngredient(ingredient)),
    removeIngredient: ingredient => dispatch(actions.removeIngredient(ingredient))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
