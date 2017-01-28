export default class AbstractDiscount {

  /**
   * Takes a cart itinerary (list of products) and a ruleset as parameters
   * and returns the amount to discount from the cart total
   * @param {Object} cart
   * @param {Object} ruleset
   * @return {Number}
   */
  calculate(cart = [], ruleSet = []) {
    return cart, ruleSet, 0;
  }
}
