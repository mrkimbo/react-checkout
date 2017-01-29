import React, { Component, PropTypes } from 'react';

import { CART_ADD } from '../../../core/actions';
import styles from './styles.less';

export default class ProductList extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  addItem(product) {
    CART_ADD.dispatch(product);
  }

  getItems() {
    return this.props.items.map((product, idx) => (
      <li key={idx} className={styles[product.id]}>
        <label>{product.displayName}</label>
        <button onClick={this.addItem.bind(this, product)}>Add to Cart</button>
      </li>
    ));
  }

  render() {
    return (
      <section className={styles.productList}>
        <h4 className={styles.title}>2: Choose Products</h4>
        <ul>
          { this.getItems() }
        </ul>
      </section>
    );
  }
}
