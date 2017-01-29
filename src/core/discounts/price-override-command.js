/**
 * @class PriceOverride
 * If the number of eligible items is greater than the rule threshold
 * then apply new price to all items
 */
export default class PriceOverride {

  static id = 'price-override';

  constructor(rules) {
    this.rules = rules;
  }

  execute(items) {
    let newItems = items.map((item) => Object.assign({}, item));
    let eligibleItems = newItems.filter((item) => item.id === this.rules.product);

    if (eligibleItems.length >= this.rules.threshold) {
      eligibleItems.forEach((item) => item.price = this.rules.price);
    }

    // return array containing de-referenced objects
    return newItems;
  }
}
