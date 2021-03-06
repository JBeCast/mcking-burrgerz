import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/order';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = this.props.loading ?
      <Spinner /> :
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
      
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));