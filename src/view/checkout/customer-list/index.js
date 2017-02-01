import React, { Component, PropTypes } from 'react';

import styles from './styles.less';
import { SIGN_IN, SIGN_OUT } from '../../../core/actions';

export default class CustomerList extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    customer: PropTypes.string
  };

  getItems() {
    return this.props.items.map((customer, idx) => {
      let classNames = [styles.button];
      if (this.props.customer === customer) {
        classNames.push('selected');
      }
      return (
        <li key={idx}>
          <button onClick={this.signIn.bind(this, customer)} className={classNames.join(' ')}>{ customer }</button>
        </li>
      );
    });
  }

  signOut() {
    SIGN_OUT.dispatch();
  }

  signIn(customer) {
    SIGN_IN.dispatch(customer);
  }

  render() {
    return (
      <section className={styles.customerList}>
        <h4 className={styles.title}>1: Select Customer</h4>
        <ul>{ this.getItems() }</ul>
        <button className={styles.signOutButton}
                disabled={!this.props.customer}
                onClick={this.signOut}>Sign out</button>
      </section>
    );
  }
}
