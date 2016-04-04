var ProductView = Backbone.View.extend({
  template: $('#item-card'),

  events: {
    'click .deletebox': 'deleteProduct'
  },

  deleteProduct: function() {
    this.collection.remove(this.model);
    this.remove();
  },

  render: function() {
    var template = Handlebars.compile(this.template.html());

    this.$el.append(template(this.model.toJSON()));
    return this;
  }
});