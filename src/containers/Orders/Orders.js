import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { orderActions } from '../../store/actions/order';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  //   state = {
  //     orders: [],
  //     loading: true
  //   };
  componentDidMount() {
    // try {
    //   console.log(this.props);
    //   const res = await axios.get('/orders.json');
    //   const fetchedOrders = [];
    //   for (let key in res.data) {
    //     fetchedOrders.push({
    //       ...res.data[key],
    //       id: key
    //     });
    //   }
    //   this.setState({ loading: false, orders: fetchedOrders });
    // } catch (error) {
    //   this.setState({ loading: false });
    // }
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(orderActions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
