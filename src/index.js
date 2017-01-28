import React from 'react';
import ReactDOM from 'react-dom';

import CheckoutView from './view/checkout';

import priceRules from './core/priceRules.json';
import model from './core/model';

model.init(priceRules);

ReactDOM.render(
  <CheckoutView/>,
  document.querySelector('.app')
);
