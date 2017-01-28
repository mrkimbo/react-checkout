import React, { Component, PropTypes } from 'react';
import { formatCurrency } from '../../../core/util';
import { CART_CLEAR } from '../../../core/actions';

import styles from './styles.css';

export default class ShoppingCart extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number
  };

  clearCart() {
    CART_CLEAR.dispatch();
  }

  getItemList() {
    return this.props.items.map((item, idx) =>
      <li key={idx} className={styles.cartItem}>
        <div>
          <span className={styles.name}>{item.displayName}</span>
          <span className={styles.price}>{formatCurrency(item.price)}</span>
        </div>
        <div>
          <span className={styles.count}>{item.count}</span>
          <span className={styles.itemTotal}>{formatCurrency(item.price * item.count)}</span>
        </div>
      </li>
    );
  }

  render() {
    let headerClasses = [styles.cartHeader, styles.cartItem];

    return (
      <section className={styles.shoppingCart}>
        <h4>3: Cart Items</h4>
        <button className={styles.emptyButton} onClick={this.clearCart}>Empty Cart</button>
        <ul>
          <li className={headerClasses.join(' ')}>
            <div>
              <span className={styles.name}>Item</span>
              <span className={styles.price}>Unit Price</span>
            </div>
            <div>
              <span className={styles.count}>Count</span>
              <span className={styles.itemTotal}>Total</span>
            </div>
          </li>
          {this.getItemList()}
        </ul>
        <div className={styles.total}>
          <span>Cart Total: </span>
          <span>{formatCurrency(this.props.total)}</span>
        </div>
      </section>
    );
  }
}
