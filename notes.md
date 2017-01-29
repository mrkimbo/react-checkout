### Products

- products expose: id, name, price

### Pricing rules

loaded on demand?
- grouped by customer
- each rule translates to a discount cart item
- cart total is item total minus discounts

types:
- blanket discount
  (specific type)
  (applied to all items)
  (price override)
  
  buy 2 get 1 free
  items: 1, free: 0
  items: 2, free: 0
  items: 3, free: 1-
  items: 4, free: 1
  items: 5, free: 1
  items: 6, free: 2-
  items: 7, free: 2
  items: 8, free: 2
  items: 9, free: 3-
  
  
  to be eligible for 1st freebie, cart count must be greater than threshold+1
  free items = items.length % threshold
  
  
  
  overthreshold = 5 % 3 = 2
  
  
  
- threshold discount 
  (specific type)
  (min items)
  (price override)
  


### View

- Simple checkout page.
- Header
- Item list
- 

