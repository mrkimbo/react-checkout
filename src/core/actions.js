import Signal from 'signals';
import Model from './model';

// Define available actions:
const Actions = {
  SIGN_IN: new Signal(),
  SIGN_OUT: new Signal(),
  CART_ADD: new Signal(),
  CART_REMOVE: new Signal(),
  CART_CLEAR: new Signal()
};

// Action handlers:
Actions.SIGN_IN.add(Model.updateCustomer);
Actions.SIGN_OUT.add(Model.updateCustomer);
Actions.CART_ADD.add(Model.addItem);
Actions.CART_REMOVE.add(Model.removeItem);
Actions.CART_CLEAR.add(Model.clearItems);

// Export actions individually:
module.exports = Actions;
