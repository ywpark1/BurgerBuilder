import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// import { ActionTypes as actionTypes } from '../../store/actions/actionTypes';
import { ingredientActions } from '../../store/actions/burgerBuilder';
import { orderActions } from '../../store/actions/order';
import { authActions } from '../../store/actions/auth';

import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    purchasable: false,
    purchasing: false
    // loading: false,
    // error: false
  };

  componentDidMount() {
    console.log(this.props);
    // try {
    //   const res = await axios.get(
    //     'https://react-burger-95f7f.firebaseio.com/ingredients.json'
    //   );
    //   this.setState({ ingredients: res.data });
    // } catch (error) {
    //   this.setState({ error: true });
    // }
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.props.ings
    };

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  };

  //   addIngredientHandler = type => {
  //     const updatedCounted = this.state.ingredients[type] + 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients,
  //       [type]: updatedCounted
  //     };

  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const newPrice = this.state.totalPrice + priceAddition;
  //     // const newPrice = oldPrice + priceAddition;

  //     this.setState(
  //       {
  //         totalPrice: newPrice,
  //         ingredients: updatedIngredients
  //       },
  //       this.updatePurchaseState
  //     );
  //   };

  //   removeIngredientHandler = type => {
  //     const oldCount = this.state.ingredients[type];

  //     if (oldCount <= 0) {
  //       return;
  //     }

  //     const updatedCounted = oldCount - 1;

  //     const updatedIngredients = {
  //       ...this.state.ingredients,
  //       [type]: updatedCounted
  //     };

  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const newPrice = this.state.totalPrice - priceAddition;

  //     this.setState(
  //       {
  //         totalPrice: newPrice,
  //         ingredients: updatedIngredients
  //       },
  //       this.updatePurchaseState
  //     );
  //   };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    // alert('You continue!');

    // const queryParams = [];

    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }

    // queryParams.push('price=' + this.state.totalPrice);

    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      //   ...this.state.ingredients
      ...this.props.ings
    };

    Object.keys(disabledInfo).map(
      (key, index) => (disabledInfo[key] = disabledInfo[key] <= 0)
    );

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoveded}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState()}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Fragment>
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(ingredientActions.addIngredient(ingName)),
    onIngredientRemoveded: ingName =>
      dispatch(ingredientActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(ingredientActions.initIngredients()),
    onInitPurchase: () => dispatch(orderActions.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(authActions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
