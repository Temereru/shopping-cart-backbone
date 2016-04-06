var AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'click .submit-product': 'addProduct', 
    'click .add-to-cart': 'addToCart', 
    'click .clear-cart': 'clearCart', 
    'click .view-cart': 'cartShow', 
    'click .view-manager': 'managerShow' 
  },

  initialize: function () {
    this.listenTo(this.model.get('products'), 'add', this.renderProduct);
    this.listenTo(this.model.get('products'), 'remove', this.fixCart);
    this.listenTo(this.model.get('cart'), 'add', this.renderCart);
    this.listenTo(this.model.get('cart'), 'remove', this.renderTotal);
    this.listenTo(this.model.get('cart'), 'change', this.renderTotal);

    this.$products = this.$('.products');
    this.$cart = this.$('.cart-list');
  },

  //used to create a new product model
  addProduct: function(e) {
    e.preventDefault();
    $('.showa').toggleClass('showa');
    var product = new ProductModel( { 
      name: $('#product-name').val(),
      price: $('#product-price').val(),
      url: $('#product-img').val()
    });
    var instant = this.model.get('products').where({name: product.attributes.name});
    if(instant.length === 0){
      if(this._validate(product)){
        this.model.get('products').add(product);
      }
    }else {
      $('#name-error').text('This product already exists');
      $('#name-error').toggleClass('showa');
    }
    

  },

  //used to create a new product view for a product model that was added to the collection
  renderProduct: function (product) {
    var view = new ProductView({ model: product, collection: this.model.get('products') });    

    this.$products.append(view.render().el);
  },

  //used to add an item to the shopping cart, or increase the amount of an item if it already exists in the shopping cart
  addToCart: function (e) {
    e.preventDefault();
    var instant = this.model.get('cart').where({identifier: $(e.target).parent().parent().data().cid});
    if(instant.length === 0){ //returns true if there is no model in the cart collection that corresponds to the given cid
      var name = $(e.target).parent().parent().data().name;
      var price = $(e.target).parent().parent().data().price;
      var identifier = $(e.target).parent().parent().data().cid;
      var product = new CartItemModel({
        name: name,
        price: price,
        identifier: identifier
      });
      this.model.get('cart').add(product);
    }else{
      $('.amountShow').toggleClass('amountShow');
      var amount = instant[0].get('amount');
      amount++;
      instant[0].set('amount', amount);
      var colArr = this.model.get('cart').models;
      var $liArr = $('.cart-list').children();
      if(colArr.length !== $liArr.length){
        console.log('something is wrong');
      }else{
        for(var i = 0; i < $liArr.length; i++){
          $($liArr[i]).find('.amount-disp').html('('+colArr[i].get('amount')+')');
          if(colArr[i].get('amount') > 1){
            $($liArr[i]).find('.amount').toggleClass('amountShow');
          }
        }
      }

    }
  },

  //used to create a new item view for the new item model that was added to the cart collection
  renderCart: function (product) {
    var view = new CartItemView({ model: product, collection: this.model.get('cart') })
    this.$cart.append(view.render().el);
    var prices = this.model.get('cart').pluck('price');
    var amounts = this.model.get('cart').pluck('amount');
    var total = 0;
    for(var i = 0; i < prices.length; i++){
      total += prices[i] * amounts[i];
    }
    $('.total').html(total);
  },

  //used to update the total display for the cart
  renderTotal: function () {
    this.model.calculateTotal();
    this.$cart.parent().parent().find('.total').html(this.model.get('cartTotal'));
  },

  //clears the cart collection and display
  clearCart: function () {
    this.model.get('cart').reset();
    this.$cart.empty();
    $('.total').html(0);
  },

  //when a product is deleted from the app, removes all instances of it in the cart collection
  fixCart: function (product) {
    var arr = this.model.get('cart').where({name:product.attributes.name,price:parseInt(product.attributes.price)});
    this.model.get('cart').remove(arr);
  },

  //displays the shopping cart on navbar button click
  cartShow: function(){
    $('.show').toggleClass('show');
    $('.shopping-cart').toggleClass('show');
  },

  //displays the add product form on navbar button click
  managerShow: function(){
    $('.show').toggleClass('show');
    $('.create-item').toggleClass('show');
  },

  //used to validate the add product form, currently only checks that the fields aren't empty
  _validate: function(product){
  var name = true;
  var price = true;
  var url = true;
  if(product.attributes.name === ''){
    name = false;
  }
  if(product.attributes.price === ''){
    price = false;
  }
  if(product.attributes.url === ''){
    url = false;
  }
  if(!name && !price && !url){
    $('#name-error').text('You have to enter a name, a price and a url for a photo');
    $('#name-error').toggleClass('showa');
    return false;
  }else if(!name && !price){
    $('#name-error').text('You have to enter a name and a price');
    $('#name-error').toggleClass('showa');
    return false;
  }else if(!price && !url){
    $('#name-error').text('You have to enter a price and a url for a photo');
    $('#name-error').toggleClass('showa');
    return false;
  }else if(!name && !url){
    $('#name-error').text('You have to enter a name and a url for a photo');
    $('#name-error').toggleClass('showa');
    return false;
  }else if(!name){
    $('#name-error').text('You have to enter a name');
    $('#name-error').toggleClass('showa');
    return false;
  }else if(!price){
    $('#name-error').text('You have to enter a price');
    $('#name-error').toggleClass('showa');
    return false;
  }else if(!url){
    $('#name-error').text('You have to enter a url for a photo');
    $('#name-error').toggleClass('showa');
    return false;
  }
  return true;
}
});