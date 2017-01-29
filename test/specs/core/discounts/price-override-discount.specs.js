import Command from '../../../../src/core/discounts/price-override-command';
import mocks from '../../mocks';

describe('PriceOverride Discount', () => {

  function execCommand(itemCount, threshold, price) {
    let cmd = new Command({
      type: 'price-override',
      product: 'mock',
      threshold,
      price
    });

    return cmd.execute(new Array(itemCount).fill(mocks.PRODUCT()));
  }

  function getTotal(items) {
    return items.reduce((n, item) => n + item.price, 0);
  }

  it('should conform to the command interface', () => {
    expect(new Command().execute).toBeDefined();
  });

  describe('execute', () => {

    it('should NOT apply the discount when there are LESS than the required number of items', () => {
      let newItems = execCommand(2, 3, 30.00);

      expect(getTotal(newItems)).toEqual(200);
    });

    it('should apply a new price to ALL items when there are the required number of items', () => {
      let newItems = execCommand(5, 3, 30.00);

      expect(getTotal(newItems)).toEqual(150);
    });
  });
});
