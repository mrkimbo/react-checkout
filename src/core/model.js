import Signal from 'signals';
import { createDiscounts } from './discounts';

class Model {

  init(priceRules) {
    this.reset();
    this.priceRules = priceRules;
    this.onChange = new Signal();
  }

  reset() {
    this.items = [];
    this.customer = undefined;
    this.discounts = [];
  }

  addItem = (item) => {
    this.items.push(Object.assign({}, item));

    this.applyDiscounts();
    this.notify();
  };

  removeItem = (item) => {
    let idx = this.items.findIndex((product) => product.id === item.id);
    if (idx === -1) {
      return;
    }
    this.items.splice(idx, 1);

    this.applyDiscounts();
    this.notify();
  };

  clearItems = () => {
    this.items = [];
    this.notify();
  };

  updateCustomer = (customer) => {
    this.customer = customer;
    this.discounts = createDiscounts(this.priceRules.discounts[this.customer]);
    this.applyDiscounts();
    this.notify();
  };

  applyDiscounts() {
    // reset prices:
    this.items.forEach((item) => item.price = this.priceRules.prices[item.id]);

    // find and apply applicable discounts:
    let newItems = this.items.map((item) => Object.assign({}, item));
    this.discounts.forEach((discount) => newItems = discount.execute(newItems));

    this.items = newItems;
  }

  calculate() {
    let total = this.items.reduce((n, product) => n + product.price, 0);
    return total;
  }

  notify() {
    this.onChange.dispatch(this);
  }
}

export default new Model();
