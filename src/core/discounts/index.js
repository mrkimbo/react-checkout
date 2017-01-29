import DiscountPercent from './percent-discount-command';
import PriceOverride from './price-override-command';

// Create Discount precedence:
// In theory, a group of products could have two discounts applied:
// First price-override, then a multibuy discount (percent/amount/etc..)
const DiscountPrecedence = [
  PriceOverride,
  DiscountPercent
];

// Create discount stack (in order of precedence)
// Assumption of only one rule per type per product
export const createDiscounts = (rules = []) => {
  let discounts = [];

  DiscountPrecedence.forEach((DiscountClass) => {
    rules.filter((rule) => rule.type === DiscountClass.id)
      .map((rule) => discounts.push(new DiscountClass(rule)));
  });

  return discounts;
};

