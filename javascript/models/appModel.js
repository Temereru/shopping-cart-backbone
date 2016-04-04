//model to create our app with the collections it needs
var AppModel = Backbone.Model.extend({
  defaults: {
    products: new ProductCollection(),
    cart: new CartCollection()
  }
});