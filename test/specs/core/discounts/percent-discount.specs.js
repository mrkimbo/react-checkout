import Command from '../../../../src/core/discounts/percent-discount-command';
import mocks from '../../mocks';

describe('PercentDiscount', () => {

  function execCommand(itemCount, threshold, discount) {
    let cmd = new Command({
      type: 'discount-percent',
      product: 'mock',
      threshold,
      discount
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

    it('should apply a discount of 10% to NO items when there are 2 items', () => {
      let newItems = execCommand(2, 2, 10);

      expect(getTotal(newItems)).toEqual(200);
    });

    it('should apply a discount of 10% to ONE item when there are 3 items', () => {
      let newItems = execCommand(3, 2, 10);

      expect(getTotal(newItems)).toEqual(290);
    });

    it('should apply a discount of 10% to ONE item when there are 5 items', () => {
      let newItems = execCommand(5, 2, 10);

      expect(getTotal(newItems)).toEqual(490);
    });

    it('should apply a discount of 10% to TWO items when there are 6 items', () => {
      let newItems = execCommand(6, 2, 10);

      expect(getTotal(newItems)).toEqual(580);
    });

    it('should apply a discount of 10% to the correct number of items', () => {
      const total = Math.ceil(Math.random() * 99999);
      let newItems = execCommand(total, 2, 10);

      let discountedItems = Math.floor(total / 3);
      let result = (total - discountedItems) * mocks.PRODUCT().price +
        discountedItems * (mocks.PRODUCT().price * 0.9);

      expect(getTotal(newItems)).toEqual(result);
    });
  });
});
