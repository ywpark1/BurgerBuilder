import React, { Component, Fragment } from 'react';

import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

// const modal = props => (
//   <Fragment>
//     <Backdrop show={props.show} clicked={props.modalClosed} />
//     <div
//       className={styles.Modal}
//       style={{
//         transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//         opacity: props.show ? '1' : '0'
//       }}
//     >
//       {props.children}
//     </div>
//   </Fragment>
// );

// export default modal;

// Converted to class component to improve rendering performance
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalCextends} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
