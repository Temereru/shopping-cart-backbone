//model for an item that is added to the cart
var CartItemModel = Backbone.Model.extend({
  defaults: {
    name: '',
    price: 0,
    amount: 1
  }
});