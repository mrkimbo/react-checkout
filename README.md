# Seek - Store (Part1)

#### Summary

Technical exercise to design a checkout UI and logic that allows 
multiple products to be added to a shopping cart and discounts 
to be applied using a 'flexible' rules system.

#### Installation

Requires:
 - Node ~6.9.4
 
Have added .nvmrc to support [nvm](https://github.com/creationix/nvm)/[avn](https://github.com/wbyoung/avn) configurations

```bash
# Switch node version (requires nvm)
nvm use
 
# Install dependencies:
npm install
 
# Run unit tests:
npm test
 
# Serve the project (localhost:8080)
npm run serve
```

#### Approach

The UI was writting using React components, with a vanilla store, 
connected using JS-Signals. The store/signals architecture is 
essentially the Flux pattern, but slightly less boilerplate, 
so faster to develop.

The discounts are applied to the model items using the command pattern.
Discount commands can be chained and applied to the cart items in
a predetermined order of precedence.

The discount rules and product prices are loaded from a JSON file 
(currently at compile-time, but should ultimately be loaded from a 
secure source). The rules are reasonably flexible and new rules can be
added by just adding a new command class.

The UI was kept as simple as possible, allowing cart items to 
be added and removed and the customer to be updated to show the
effects of different discounts on the cart items.

Originally written to collate the cart items and show an item count
and total price, I changed tack to just list all items. 
This provided greater clarity as to which discounts were applied
to which items.

#### Technology Choices

- **ES2015:** No other choice
- **React:** Don't get to use it enough, so always good to keep skills fresh and practise
- **Signals:** Great idea in the flash days, still a great idea
- **Webpack:** Best choice these days, plus loader support
- **CSS-loader/Style-loader:** Needed to try this out
- **PostCSS:** Fried awesome. Would've used preCSS too, but had config issues
- **Less-loader:** In lieu of preCSS
- **Jasmine:** Familiar and includes spy support out of the box
- **Istanbul:** Need that test coverage
- **ESLint:** Essential to maintain consistent code style. Simple and massively configurable
- **React-a11y:** Dev-time alerts for common accessibility issues
- **NPM Shrinkwrap:** Lock down dependency versioning
