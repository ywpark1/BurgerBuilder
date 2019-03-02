import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  async componentDidMount() {
    try {
      console.log(this.props);
      const res = await axios.get(
        'https://react-burger-95f7f.firebaseio.com/ingredients.json'
      );
      this.setState({ ingredients: res.data });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.state.ingredients
    };

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const updatedCounted = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCounted
    };

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    // const newPrice = oldPrice + priceAddition;

    this.setState(
      {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      },
      this.updatePurchaseState
    );
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCounted = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCounted
    };

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceAddition;

    this.setState(
      {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      },
      this.updatePurchaseState
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    // alert('You continue!');
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'C D',
    //     address: {
    //       street: 'Test 123',
    //       zipCode: 'aaabb3',
    //       country: 'Canada'
    //     },
    //     email: 'abc@gee.ca'
    //   },
    //   deliveryMethod: 'Fast'
    // };
    // try {
    //   axios.post('/orders.json', order);
    //   //   setTimeout(() => {
    //   //     this.setState({ loading: false, purchasing: false });
    //   //   }, 2000);
    //   this.setState({ loading: false, purchasing: false });
    // } catch (error) {
    //   console.log(error);
    //   this.setState({ loading: false, purchasing: false });
    // }

    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    Object.keys(disabledInfo).map(
      (key, index) => (disabledInfo[key] = disabledInfo[key] <= 0)
    );

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
