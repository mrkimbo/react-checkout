import model from '../../../src/core/model';
import mocks from '../mocks';
import { createDiscounts } from '../../../src/core/discounts';

let spyObj = {
  createDiscounts
};

function populateModel() {
  model.items = new Array(3).fill(mocks.PRODUCT());
}

describe('Model', () => {

  beforeEach(() => {
    model.init(mocks.RULES());
    populateModel();
    spyOn(spyObj, 'createDiscounts').and.callThrough();
    spyOn(model, 'applyDiscounts').and.callThrough();
    spyOn(model, 'notify').and.callThrough();
  });
  afterEach(() => {
    model.reset();
  });

  describe('reset', () => {

    beforeEach(() => {
      model.customer = 'bob';
      model.discounts = [1, 2, 3];
      model.reset();
    });

    it('should remove any stored customer', () => {
      expect(model.customer).not.toBeDefined();
    });

    it('should remove any stored items', () => {
      expect(model.items.length).toEqual(0);
    });

    it('should remove any stored discounts', () => {
      expect(model.discounts.length).toEqual(0);
    });
  });

  describe('addItem', () => {

    beforeEach(() => {
      model.items.length = 0;
      model.addItem(mocks.PRODUCT());
    });

    it('should save the new item', () => {
      expect(model.items.length).toEqual(1);
    });

    it('should apply the available discounts to the stored items', () => {
      expect(model.applyDiscounts).toHaveBeenCalled();
    });

    it('should notify listeners that the model has changed', () => {
      expect(model.notify).toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {

    beforeEach(() => {
      model.removeItem(mocks.PRODUCT());
    });

    it('should remove the item if it is present in the stored items', () => {
      expect(model.items.length).toEqual(2);
    });

    it('should not error if the item is NOT present in the stored items', () => {
      expect(() => model.removeItem({ id: 'unknown' })).not.toThrow();
    });

    it('should apply the available discounts to the stored items', () => {
      expect(model.applyDiscounts).toHaveBeenCalled();
    });

    it('should notify listeners that the model has changed', () => {
      expect(model.notify).toHaveBeenCalled();
    });
  });

  describe('clearItems', () => {

    beforeEach(() => {
      model.clearItems();
    });

    it('should remove ALL the items', () => {
      expect(model.items.length).toEqual(0);
    });

    it('should notify listeners that the model has changed', () => {
      expect(model.notify).toHaveBeenCalled();
    });
  });

  describe('updateCustomer', () => {

    beforeEach(() => {
      model.updateCustomer('bob');
    });

    it('should store the logged in customer', () => {
      expect(model.customer).toEqual('bob');
    });

    it('should set the discounts available for that customer', () => {
      expect(model.discounts.length).toEqual(2);
    });

    it('should set NO discounts when NONE are available for that customer', () => {
      model.updateCustomer('nobody');
      expect(model.discounts.length).toEqual(0);
    });

    it('should apply the available discounts to the stored items', () => {
      expect(model.applyDiscounts).toHaveBeenCalled();
    });

    it('should notify listeners that the model has changed', () => {
      expect(model.notify).toHaveBeenCalled();
    });
  });

  describe('applyDiscounts', () => {

    it('should apply a price-override discount', () => {
      model.discounts = createDiscounts([mocks.PRICE_OVERRIDE_RULE()]); // blanket price override to $50
      model.applyDiscounts();

      expect(model.items.map((item) => item.price)).toEqual([50, 50, 50]);
    });

    it('should apply a percent discount', () => {
      model.discounts = createDiscounts([mocks.PERCENT_DISCOUNT_RULE()]); // 10% discount on every third item
      model.applyDiscounts();

      expect(model.items.map((item) => item.price)).toEqual([100, 100, 90]);
    });

    it('should apply both percent and price-override discounts', () => {
      model.discounts = createDiscounts([
        mocks.PERCENT_DISCOUNT_RULE(),
        mocks.PRICE_OVERRIDE_RULE()
      ]);
      model.applyDiscounts();

      expect(model.items.map((item) => item.price)).toEqual([50, 50, 45]);
    });
  });

  describe('calculate', () => {

    it('should sum the prices of ALL items in the cart WITHOUT discounts', () => {
      expect(model.calculate()).toEqual(300); // 100 * 3;
    });

    it('should sum the prices of ALL items in the cart with discounts', () => {
      model.updateCustomer('bob');
      expect(model.calculate()).toEqual(145); // 50 + 50 + 45
    });
  });

  // just for coverage...
  describe('notify', () => {

    beforeEach(() => {
      spyOn(model.onChange, 'dispatch');
      model.notify();
    });

    it('should dispatch the change signal', () => {
      expect(model.onChange.dispatch).toHaveBeenCalled();
    });
  });
});
