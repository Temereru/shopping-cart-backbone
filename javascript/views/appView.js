var AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'click .submit-product': 'addProduct',
    'click .add-to-cart': 'addToCart',
    'click .clear-cart': 'clearCart'
  },

  initialize: function () {
    this.listenTo(this.model.get('products'), 'add', this.renderProduct);
    this.listenTo(this.model.get('products'), 'remove', this.fixCart);
    this.listenTo(this.model.get('cart'), 'add', this.renderCart);
    this.listenTo(this.model.get('cart'), 'remove', this.renderTotal);

    this.$products = this.$('.products');
    this.$cart = this.$('.cart-list');
  },

  addProduct: function(e) {
    e.preventDefault();
    var product = new ProductModel( { 
      name: $('#product-name').val(),
      price: $('#product-price').val(),
      url: $('#product-img').val()
    });
    this.model.get('products').add(product);

  },

  renderProduct: function (product) {
    // create a new from the newly added post model
    var view = new ProductView({ model: product, collection: this.model.get('products') });
    
    // render and append the new postView
    this.$products.append(view.render().el);
  },

  addToCart: function (e) {
    e.preventDefault();
    var name = $(e.target).parent().parent().data().name;
    var price = $(e.target).parent().parent().data().price;
    var product = new CartItemModel({
      name: name,
      price: price
    });

    this.model.get('cart').add(product);
  },

  renderCart: function (product) {
    var view = new CartItemView({ model: product, collection: this.model.get('cart') })

    this.$cart.append(view.render().el);
    var prices = this.model.get('cart').pluck('price');
    var total = 0;
    for(var i = 0; i < prices.length; i++){
      total += prices[i];
    }
    this.$cart.parent().parent().find('.total').html(total);
  },

  renderTotal: function () {
    var prices = this.model.get('cart').pluck('price');
    var total = 0;
    for(var i = 0; i < prices.length; i++){
      total += prices[i];
    }
    this.$cart.parent().parent().find('.total').html(total);
  },

  clearCart: function () {
    this.model.get('cart').reset();
    this.$cart.empty();
    this.$cart.parent().parent().find('.total').html(0);
  },

  fixCart: function (product) {
    var arr = this.model.get('cart').where({name:product.attributes.name,price:parseInt(product.attributes.price)});
    this.model.get('cart').remove(arr);
  }
});