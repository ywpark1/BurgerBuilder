import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    this.setState({ loading: true });
    event.preventDefault();

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Test AAA',
        address: {
          street: 'Test 123',
          zipCode: 'aaabb3',
          country: 'Canada'
        },
        email: 'abc@gee.ca'
      },
      deliveryMethod: 'Fast'
    };
    console.log(order);
    try {
      axios.post('/orders.json', order);
      //   setTimeout(() => {
      //     this.setState({ loading: false, purchasing: false });
      //   }, 2000);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  render() {
    // console.log('ContactData');
    // console.log(this.props);
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
