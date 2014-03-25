App.Views.ControlPanel.SpindalSelect = Ember.Select.extend({
  didInsertElement: function() {
    activateSelectBox(this.$());
    this.$().selectBox('value', this.initVal);
  }
});
