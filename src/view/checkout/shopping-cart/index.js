import React, { Component, PropTypes } from 'react';
import { formatCurrency } from '../../../core/currency';
import { CART_CLEAR, CART_REMOVE } from '../../../core/actions';

import styles from './styles.less';

export default class ShoppingCart extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number
  };

  state = {
    items: []
  };

  componentWillReceiveProps(props) {
    // collate shopping cart items
    this.setState({
      /*items: props.items.reduce((arr, item) => {
       let entry = arr.find((product) => product.id === item.id);
       if (entry) {
       entry.count += 1;
       } else {
       arr.push(Object.assign({ count: 1 }, item));
       }
       return arr;
       }, [])*/
      items: props.items
    });
  }

  removeItem(item) {
    CART_REMOVE.dispatch(item);
  }

  clearCart() {
    CART_CLEAR.dispatch();
  }

  getItemList() {
    return this.state.items.map((item, idx) =>
      <li key={idx} className={styles.cartItem}>
        <button className={styles.deleteButton} onClick={this.removeItem.bind(this, item)}>X</button>
        <span className={styles.name}>{item.displayName}</span>
        <span className={styles.price}>{formatCurrency(item.price)}</span>
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
            <span className={styles.spacer}></span>
            <span className={styles.name}>Item</span>
            <span className={styles.price}>Unit Price</span>
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
