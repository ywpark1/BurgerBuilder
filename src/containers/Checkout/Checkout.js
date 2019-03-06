import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

class Checkout extends Component {
  //   state = {
  //     ingredients: {
  //       bacon: 1,
  //       cheese: 1,
  //       meat: 1,
  //       salad: 1
  //     },
  //     price: 0
  //   };

  //   static getDerivedStateFromProps(props, state) {
  //   componentDidMount() {
  //     //   componentWillMount() {
  //     const query = new URLSearchParams(this.props.location.search);
  //     const ingredients = {};
  //     let price = 0;

  //     for (let param of query.entries()) {
  //       if (param[0] === 'price') {
  //         price = param[1];
  //       } else {
  //         ingredients[param[0]] = +param[1];
  //       }
  //     }

  //     this.setState({ ingredients: ingredients, price: price });
  //   }

  checkoutCancelledHandler = () => {
    // console.log('btn Clicked');
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.props.ings}
              price={this.state.price}
            />
          )}
        /> */}
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
