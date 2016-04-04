var CartItemView = Backbone.View.extend ({
  template: $('#cart-item'),

  events: {
    'click .item-remove': 'removeItem',
    'click .item-decrease': 'decreaseItem'
  },

  initialize: function () {
    this.listenTo(this.model, 'remove', this.removeItem);
  },

  removeItem: function(){
    this.collection.remove(this.model);
    this.remove();
  },

  decreaseItem: function(){
    this.model.attributes.amount--;
    console.log('removed');
    $('.amountShow').toggleClass('amountShow');
      var colArr = this.collection.models;
      var $liArr = $('.cart-list').children();
      console.log($liArr);
      if(colArr.length !== $liArr.length){
        console.log('something is wrong');
      }else{
        for(var i = 0; i < $liArr.length; i++){
          $($liArr[i]).find('.amount-disp').html('('+colArr[i].attributes.amount+')');
          if(colArr[i].attributes.amount > 1){
            $($liArr[i]).find('.amount').toggleClass('amountShow');
          }
        }
      }
      var prices = this.collection.pluck('price');
      var amounts = this.collection.pluck('amount');
      var total = 0;
      for(var i = 0; i < prices.length; i++){
        total += prices[i] * amounts[i];
      }
      $('.total').html(total);
  },

  render: function(){
    var template = Handlebars.compile(this.template.html());

    this.$el.append(template(this.model.toJSON()));
    return this;
  }
});