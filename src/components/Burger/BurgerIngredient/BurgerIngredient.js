import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredient.module.css';

// Functional Components
// const burgerIngredient = props => {
//   let ingredient = null;

//   switch (props.type) {
//     case 'bread-bottom':
//       ingredient = <div className={styles.BreadBottom} />;
//       break;
//     case 'bread-top':
//       ingredient = (
//         <div className={styles.BreadTop}>
//           <div className={styles.Seeds1} />
//           <div className={styles.Seeds2} />
//         </div>
//       );
//       break;
//     case 'meat':
//       ingredient = <div className={styles.Meat} />;
//       break;
//     case 'cheese':
//       ingredient = <div className={styles.Cheese} />;
//       break;
//     case 'salad':
//       ingredient = <div className={styles.Salad} />;
//       break;
//     case 'bacon':
//       ingredient = <div className={styles.Bacon} />;
//       break;
//     default:
//       ingredient = null;
//   }
// return ingredient;
// };

// burgerIngredient.propTypes = {
//   type: PropTypes.string
// };

// export default burgerIngredient;

// Class Component
class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={styles.BreadBottom} />;
        break;
      case 'bread-top':
        ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1} />
            <div className={styles.Seeds2} />
          </div>
        );
        break;
      case 'meat':
        ingredient = <div className={styles.Meat} />;
        break;
      case 'cheese':
        ingredient = <div className={styles.Cheese} />;
        break;
      case 'salad':
        ingredient = <div className={styles.Salad} />;
        break;
      case 'bacon':
        ingredient = <div className={styles.Bacon} />;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
