var AppModel = Backbone.Model.extend({
  defaults: {
    products: new ProductCollection(),
    cart: new CartCollection()
  }
});