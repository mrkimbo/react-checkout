import Signal from 'signals';

class Model {

  init(priceRules) {
    this.items = [];
    this.customer = '';
    this.discounts = [];
    this.priceRules = priceRules;
    this.onChange = new Signal();
  }

  addItem = (item) => {
    let entry = this.items.find((product) => product.id === item.id);
    if (entry) {
      entry.count += 1;
    } else {
      this.items.push(Object.assign({
        count: 1,
        price: this.priceRules.prices[item.id]
      }, item));
    }

    this.applyDiscounts();
    this.notify();
  };

  removeItem = (item) => {
    let idx = this.items.findIndex((product) => product.id === item.id);
    if (idx === -1) {
      return;
    }

    let entry = this.items[idx];
    entry.count -= 1;
    if (entry.count <= 0) {
      this.items.splice(idx, 1);
    }

    this.applyDiscounts();
    this.notify();
  };

  clearItems = () => {
    this.items = [];
    this.notify();
  };

  updateCustomer = (customer) => {
    this.customer = customer;
    this.discounts = this.priceRules[customer] || [];
    this.applyDiscounts();
    this.notify();
  };

  applyDiscounts() {
    // find applicable discounts:

  }

  calculate() {
    let total = this.items.reduce((n, product) => {
      return n + (product.price * product.count);
    }, 0);
    return total;
  }

  notify() {
    this.onChange.dispatch(this);
  }
}

export default new Model();
