/**
 * @class DiscountPercent
 * If the number of eligible items is a multiple of the rule threshold
 * then apply percentage discount to the appropriate number of items
 * @example
 * threshold = 2 (buy two get one free)
 * CartItems: 1, No free items
 * CartItems: 2, No free items
 * CartItems: 3, One free item
 * CartItems: 4, One free item
 * CartItems: 5, One free item
 * CartItems: 6, Two free items
 */
export default class DiscountPercent {

  static id = 'discount-percent';

  constructor(rules) {
    this.rules = rules;
  }

  execute(items) {
    let multiplier;
    let newItems = items.map((item) => Object.assign({}, item));
    let eligibleItems = newItems.filter((item) => item.id === this.rules.product);
    let bonusCount = Math.floor(eligibleItems.length / (this.rules.threshold + 1));

    while (bonusCount) {
      multiplier = (100 - this.rules.discount) / 100;
      eligibleItems[eligibleItems.length - bonusCount].price *= multiplier;
      bonusCount -= 1;
    }

    // return array containing de-referenced objects
    return newItems;
  }
}
