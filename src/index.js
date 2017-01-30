import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import CheckoutView from './view/checkout';

import priceRules from './core/priceRules.json';
import model from './core/model';

// enable accessibility debugging for development:
a11y(React);

// should be loaded from secure location:
model.init(priceRules);

ReactDOM.render(
  <CheckoutView/>,
  document.querySelector('.app')
);
