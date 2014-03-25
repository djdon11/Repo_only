App.Models.galleryAttrs = ['_id', 'g_photos_disabled', 'g_videos_disabled', 'g_transition_time', 'g_transition_style'];
App.Models.logoAttrs = ['_id','band_id', 'font_name', 'font_color', 'font_size', 'alignment', 'file_path'];

App.Models.Band = Ember.Resource.extend({
  resourceUrl: '/api/bands',
  resourceName: 'band',
  resourceIdField: '_id',
  resourceProperties: ['genre_id', 'sub_genre_id', 'city', 'state', 'country', 'paypal_email', 'paypal_currency', 'play_button_disabled',  'logo_disabled', 'live_shows_disabled','news_disabled', 'fb_disabled', 'twitter_disabled', 'store_disabled', 'bio_disabled', 'custom_domain']
});

App.Models.Gallery = Ember.Resource.extend({
  resourceUrl: '/api/bands',
  resourceName: 'band',
  resourceIdField: '_id',
  resourceProperties: App.Models.galleryAttrs
});

App.Models.Logo = Ember.Resource.extend({
  resourceUrl: '/api/logos',
  resourceName: 'logo',
  resourceIdField: '_id',
  resourceProperties: App.Models.logoAttrs,
  uploadUrl: function () {
    var resourceUrl = this.get('resourceUrl');
    var uploadUrl   = resourceUrl.concat('/upload');
    return uploadUrl;
  }.property('resourceUrl'),
});

App.Models.Photo = Ember.Resource.extend({
  resourceUrl: '/api/photos',
  resourceName: 'photo',
  resourceIdField: '_id',
  resourceProperties: ['band_id','url', 'order'],
  uploadUrl: function () {
    var resourceUrl = this.get('resourceUrl');
    var uploadUrl   = resourceUrl.concat('/upload');
    return uploadUrl;
  }.property('resourceUrl'),
});