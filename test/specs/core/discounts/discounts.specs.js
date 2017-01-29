import { createDiscounts } from '../../../../src/core/discounts';
import PriceOverrideDiscount from '../../../../src/core/discounts/price-override-command';
import PercentDiscount from '../../../../src/core/discounts/percent-discount-command';

const PRICE_OVERRIDE_DISCOUNT = {
  type: 'price-override',
  product: 'standout',
  threshold: 0,
  price: 299.99
};
const PERCENT_DISCOUNT = {
  type: 'discount-percent',
  product: 'classic',
  threshold: 2,
  discount: 100
};

describe('Discounts', () => {

  let result;

  beforeEach(() => {
    result = createDiscounts([PRICE_OVERRIDE_DISCOUNT, PERCENT_DISCOUNT]);
  });

  it('should create available discount commands from the given rules', () => {
    expect(result.length).toEqual(2);
    expect(result).toContain(jasmine.any(PriceOverrideDiscount));
    expect(result).toContain(jasmine.any(PercentDiscount));
  });

  it('should return the commands in order of precedence', () => {
    expect(result[0]).toEqual(jasmine.any(PriceOverrideDiscount));
    expect(result[1]).toEqual(jasmine.any(PercentDiscount));
  });
});
