const PRICE_OVERRIDE_RULE = () => ({
  type: 'price-override',
  product: 'mock',
  threshold: 0,
  price: 50.00
});

const PERCENT_DISCOUNT_RULE = () => ({
  type: 'discount-percent',
  product: 'mock',
  threshold: 2,
  discount: 10
});

const PRICES = () => ({
  mock: 100.00
});

const RULES = () => ({
  prices: PRICES(),
  discounts: {
    bob: [
      PERCENT_DISCOUNT_RULE(),
      PRICE_OVERRIDE_RULE()
    ]
  }
});

const PRODUCT = () => ({
  id: 'mock',
  displayName: 'mockItem',
  price: 100.00
});

export default {
  PRICE_OVERRIDE_RULE,
  PERCENT_DISCOUNT_RULE,
  PRICES,
  RULES,
  PRODUCT
};
