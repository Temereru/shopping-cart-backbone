var CartItemView = Backbone.View.extend ({
  template: $('#cart-item-1'),

  events: {
    'click .item-remove': 'removeItem'
  },

  initialize: function () {
    this.listenTo(this.model, 'remove', this.removeItem);
  },

  removeItem: function(){
    this.collection.remove(this.model);
    this.remove();
  },

  render: function(){
    var template = Handlebars.compile(this.template.html());

    this.$el.append(template(this.model.toJSON()));
    return this;
  }
});