import React, { Component } from 'react';

import CustomerList from './customer-list';
import ProductList from './product-list';
import ShoppingCart from './shopping-cart';

import model from '../../core/model';
import { CUSTOMERS, PRODUCTS } from '../../core/constants';

export default class CheckoutView extends Component {

  constructor(props) {
    super(props);

    model.onChange.add(() => {
      this.setState({
        customer: model.customer,
        items: model.items,
        cartTotal: model.calculate()
      });
    });
  }

  state = {
    customer: undefined,
    items: []
  };

  render() {
    return (
      <div>
        <header>
          <h1>Checkout</h1>
        </header>
        <CustomerList items={CUSTOMERS} customer={this.state.customer}/>
        <ProductList items={PRODUCTS}/>
        <ShoppingCart items={this.state.items} total={this.state.cartTotal}/>
      </div>
    );
  }
}
