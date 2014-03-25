

App.Views.Sidebar.ArtistDetails = Ember.View.extend({
  templateName: 'player-artist-details',
  tagName: 'ul',
  classNames: ['artist'],
  bandBinding: 'App.Controllers.ControlPanel.band.details',
  didInsertElement: function() {
    this.$('.accordion').accordion({
      active: false,
      collapsible: true
    });

    this.$('.show-gallery-arrows').click(function() {
      $(this).toggleClass('active');
      $('ul.gallery-arrows').toggleClass('active');
    });

    this.$("a.nav-gallery").click(function() {
      $("li.nav-gallery").toggleClass("active");
    })

    this.$('#gallery-photos-button').click(function() {
      $('#gallery-videos-button').removeClass('active');
    });

    this.$('#gallery-videos-button').click(function() {
      $('#gallery-photos-button').removeClass('active');
    });

    this.$("a.nav-news").click(function() {
      $("li.nav-news").toggleClass("active");
    })

    this.$('a.show.bio').click(function() {
      showArtistPane('bio');
    });
    this.$('a.show.news').click(function() {
      showArtistPane('news');
    });
    this.$('a.show.live').click(function() {
      showArtistPane('live');
    });

  }
});