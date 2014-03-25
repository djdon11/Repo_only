App.Controllers.ControlPanel.photoList = Ember.ArrayController.create({
  content: [],
  setup: function(json) {
    list = this;
    if(json) {
      $.each(json, function(index, obj) {
        list.pushObject(App.Models.Photo.create(obj));
      });
    }

    var numPhoto = this.get('content').length;
    if(numPhoto < 15) {
      for(i=15; i>numPhoto; i--) {
        this.pushObject(App.Models.Photo.create({
          band_id: App.Controllers.ControlPanel.band.details._id
        }));
      }
    }
  }
});

App.Controllers.ControlPanel.band = Ember.Object.create({
  //TODO: See how App.Models.Band can be used
  details: App.Models.Band.create(),
  gallery: App.Models.Gallery.create(),
  logo: App.Models.Logo.create(),
  setup: function(json) {
    details = this.details;
    gallery = this.gallery;

    if(json) {
      $.each(json, function(key, val) {
        details.set(key, val);
      });
      this.setupGallery(json);
      this.setupLogo(json["logo"]);
    }

    // Workarounds to bind SelectBox selected value
    details.reopen({
      genre_idBinding: 'App.Controllers.ControlPanel.band.details.genre._id',
      sub_genre_idBinding: 'App.Controllers.ControlPanel.band.details.sub_genre._id',
      currencyChanged: function() {
        this.set('paypal_currency', this.selected_currency.value);
      }.observes('selected_currency'),
      nameChanged: function() {
        this.set('spindle_url', "spindal.com/" + this.get('name'));
      }.observes('name')
    });
  },
  setupGallery: function(json) {
    gallery = this.gallery;

    $.each(App.Models.galleryAttrs, function(index, val) {
      gallery.set(val, json[val]);
    });
  },
  setupLogo: function(json) {
    logo = this.logo;
    if(json) {
      $.each(App.Models.logoAttrs, function(index, val) {
        logo.set(val, json[val]);
      });
    }

    logo.set('band_id', this.details._id);

    logo.reopen({
      logoFontChanged: function() {
        this.set('font_name', this.selected_font.value);
      }.observes('selected_font'),
      logoAlignmentChanged: function() {
        this.set('alignment', this.selected_alignment.value);
      }.observes('selected_alignment')
    });
  }
});