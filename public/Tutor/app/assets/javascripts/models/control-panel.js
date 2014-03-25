
// TODO: populate these values using Rails, so back-end changed do not break them.
App.Models.newsAttrs = ['blog_platform_id', 'blog_url', 'email_api_key', 'email_provider_id', 'blog_platform_id', 'blog_url', 'fb_handle','twitter_handle', 'news_fb_disabled', 'news_twitter_disabled', 'news_blog_disabled', 'news_email_disabled'];
App.Models.userAttrs = ['_id', 'plan_id', 'status', 'first_name', 'last_name', 'email', 'password'];
App.Models.creditCardAttrs = ['_id','type', 'number', 'security_code', 'billing_zip_code', 'expiry_month', 'expiry_year'];
App.Models.albumAttrs = ['title', 'band_id', 'price', 'download_type', 'amazon_store_link', 'itunes_store_link', 'record_label', 'release_year', 'title_disabled','cover_disabled','download_disabled','share_disabled','num_song_plays_disabled','parental_advisory_disabled','release_date_disabled','record_label_disabled'];

App.Models.User = Ember.Resource.extend({
  resourceUrl: '/api/users',
  resourceName: 'user',
  resourceIdField: '_id',
  resourceProperties: App.Models.userAttrs
});

App.Models.CreditCard = Ember.Resource.extend({
  resourceUrl: '/api/credit_cards',
  resourceName: 'credit_card',
  resourceIdField: '_id',
  resourceProperties: App.Models.creditCardAttrs,
  numberLastFour: Ember.computed(function() {
    return this.get('number')%10000;
  }).property('number')
});

App.Models.Song = Ember.Resource.extend({
    resourceUrl: '/api/songs'
  , resourceName: 'song'
  , resourceIdField: '_id'
  , resourceProperties: ['title', 'album_id', 'price', 'download_type', 'amazon_store_link', 'itunes_store_link', 'lyrics', 'slideshow_trans_time', 'slideshow_trans_style', 'video_embed_tag', 'disabled', 'download_disabled', 'lyrics_disabled', 'fullscreen_disabled', 'file', 'fileUploading']
  , fileUploaded: function () {
      var url = this.get('file').url;
      if (undefined != url) {
        return 0 < url.length;
      } else {
        return false;
      }
    }.property('file', 'fileUploaded')

  , fileMissing: function () {
      return !this.get('fileUploaded');
    }.property('file', 'fileUploaded')

  , uploadUrl: function () {
      var _id         = this.get('_id');
      var resourceUrl = this.get('resourceUrl');
      var uploadUrl   = resourceUrl.concat('/', _id, '/upload');
      return uploadUrl;
    }.property('_id', 'resourceUrl')

  , uploadSongFile: function (form) {
    var song      = this;
    var url       = this.get('uploadUrl');
    var csrfToken = $('meta[name=csrf-token]').prop('content');
    $.ajax(url, {
        files   : $('input:file', form)
      , iframe  : true
      , headers : { 'X-CSRF-Token' : csrfToken }
      , beforeSend : function () {
          song.set('fileUploading', true);
          song.set('file', '');
        }

      // Success is being skipped by jquery-iframe-transport plugin,
      // ergo the hack in the error() callback.
      , success : function (data, textStatus, jqXHR) {
          song.set('file', data.file);
          return true;
        }

      , error : function (jqXHR, textStatus, errorThrown) {
          var responseText = jqXHR.responseText;
          // If the response text is JSON formatted, then:
          if (undefined != responseText && responseText.match(/^\{.*\}$/)) {
            var data = JSON.parse(responseText);
            song.set('file', data.file);
            return true;
          } else {
            alert("Error: The file you tried to upload did not work. Please try again.");
            return false;
          }
        }
      , complete : function () { song.set('fileUploading', false); }
    });
  }
});

App.Models.Album = Ember.Resource.extend({
  resourceUrl: '/api/albums',
  resourceName: 'album',
  resourceIdField: '_id',
  resourceProperties: App.Models.albumAttrs
})

App.Models.LiveShow = Ember.Resource.extend({
  resourceUrl: '/api/live_shows',
  resourceName: 'live_show',
  resourceIdField: '_id',
  resourceProperties: ['band_id', 'day', 'venue', 'city', 'state', 'ticket_url', 'tickets_disabled'],
  location: Ember.computed(function(key, value) {
    // getter
    if (arguments.length === 1) {
        var city = this.get('city');
        var state = this.get('state');
        if(!city && !state)
          return "";
        else
          return (city + ',' + state);
    } else {
      var loc = value.split(",");
      this.set('city', loc[0]? loc[0]:"");
      this.set('state', loc[1]? loc[1]:"");

      return value;
    }
  }).property('city','state')
});

App.Models.Video = Ember.Resource.extend({
  resourceUrl: '/api/videos',
  resourceName: 'video',
  resourceIdField: '_id',
  resourceProperties: ['band_id','title', 'url', 'img_url', 'provider' ,'order']
});

App.Models.Plan = Ember.Object.extend({
  capName: Ember.computed(function(){
    return capitalize(this.name);
  }).property('name')
});
