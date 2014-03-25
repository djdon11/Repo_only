App.Controllers.ControlPanel.songList = Ember.ArrayController.create({
  content: [],
  parse: function(json) {
    var songs = this;

    $.each(json, function(index, obj) {
      songs.addObject(App.Models.Song.create(obj));
      songs.set('album_id', obj.album_id);
    });

  }
});

App.Controllers.ControlPanel.albumList = Ember.ArrayController.create({
  content: [],
  setup: function(json) {
    albums = this.content;

    $.each(json, function(index, obj) {
      albums.addObject(App.Models.Album.create(obj));
    });
  }
});

App.Controllers.ControlPanel.account = Ember.Object.create({
  user: App.Models.User.create(),
  creditCard: App.Models.CreditCard.create(),
  plan: App.Models.Plan.create(),
  setup: function(json) {
    if(json)
      this.setupUser(json);
  },
  setupUser: function(json) {
    user = this.user;

    $.each(App.Models.userAttrs, function(index, val) {
        user.set(val, json[val]);
    });

    this.setupCreditCard(json['credit_card']);
    this.setupPlan(json['plan']);

  },
  setupPlan: function(json) {
    if(json){
      plan = this.plan;
      $.each(json, function(key,val) {
        plan.set(key,val);
      });
    }
  },
  setupCreditCard: function(json) {
    if(json){
      creditCard = this.creditCard;
      $.each(App.Models.creditCardAttrs, function(index, val) {
        creditCard.set(val, json[val]);
      });
    }

    this.bindCreditCardSelects();
  },
  bindCreditCardSelects: function() {
    this.creditCard.reopen({
      cardTypeChanged: function() {
        this.set('type', this.selected_type.value);
      }.observes('selected_type'),
      cardYearChanged: function() {
        this.set('expiry_year', this.selected_expiry_year.value);
      }.observes('selected_expiry_year'),
      cardMonthChanged: function() {
        this.set('expiry_month', this.selected_expiry_month.value);
      }.observes('selected_expiry_month')
    });
  }
});

App.Controllers.ControlPanel.liveShowList = Ember.ArrayController.create({
  content: [],
  setup: function(json) {
    list = this;
    $.each(json, function(index, obj) {
      list.pushObject(App.Models.LiveShow.create(obj));
    });
  }
});

App.Controllers.ControlPanel.videoList = Ember.ArrayController.create({
  content: [],
  setup: function(json) {
    list = this;
    if(json) {
      $.each(json, function(index, obj) {
        list.pushObject(App.Models.Video.create(obj));
      });
    }

    var numVideos = this.get('content').length;
    if(numVideos < 15) {
      for(i=15; i>numVideos; i--) {
        this.pushObject(App.Models.Video.create({
          band_id: App.Controllers.ControlPanel.band.details._id
        }));
      }
    }
  }
});

App.Controllers.ControlPanel.appConstants = Ember.Object.create({
  bandGenre: Ember.ArrayController.create(),
  bandSubGenre: Ember.ArrayController.create(),
  blogPlatform: Ember.ArrayController.create(),
  emailProvider: Ember.ArrayController.create(),
  plans: Ember.ArrayController.create(),
  setup: function(data) {
    this.bandGenre.set('content', data.band_genre);
    this.bandSubGenre.set('content', data.band_sub_genre);
    this.blogPlatform.set('content', data.blog_platform);
    this.emailProvider.set('content', data.email_provider);
    this.plans.set('content', data.plan);
  }
});











App.Controllers.songList = Ember.Object.create({
  songs: [],
  parse: function(json) {
    var songs = this.songs;

    json.forEach(function(item, index, self) {
      songs.push(App.Models.Song.create(item));
    });
  }

});

App.Controllers.albumList = Ember.Object.create({
  albums: [],
  setup: function() {
    albums = this.albums;

    return $.getJSON('/albums/test.json', function(data) {
      data.forEach(function(item, index, self) {
        albums.push(App.Models.Album.create(item));
      });
    });
  }
});
