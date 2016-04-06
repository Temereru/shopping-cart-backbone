//model to create our app with the collections it needs
var AppModel = Backbone.Model.extend({
  defaults: {
    products: new ProductCollection(),
    cart: new CartCollection(),
    cartTotal: 0
  },

  calculateTotal: function(){
    var prices = this.get('cart').pluck('price');
    var amounts = this.get('cart').pluck('amount');
    var total = 0;
    for(var i = 0; i < prices.length; i++){
      total += prices[i] * amounts[i];
    }
    this.set('cartTotal', total)
  }
});