/*********** Profile Tab *************/

App.Views.ControlPanel.Band = Ember.View.extend(App.Mixins.AutoSave, {
  templateName: "control-panel-profile",
  tagName: "form",
  band: App.Controllers.ControlPanel.band.details,
  attrChanged: function() {
    this.delayedAutoSave();
  }.observes('delayedSaveAttributes'), 
  delayedSaveAttributes: Ember.computed(function() {
  }).property('band.city', 'band.state', 'band.country'),
  didInsertElement: function () {
    // TODO: make this a event handler
    $('#events td.status a.delete').click(function() {
      $('.popup.delete-event').showPop();
    });
    this.initializeAutoSaveFor(this.band);
  },
  currencyChanged: function(evt) {
    console.log(evt);
    console.log('currencyChanged');
  },
  //TODO: For all popups, no need to create view every time, create once
  //TODO: Container View for containing all popup Views? Remove popup containers from Application.html  
  showStore: function(event) {
    $('#store-pop').showPop();
    var view = App.Views.ControlPanel.BandStore.create();
    view.replaceIn("#store-pop");
  },

  showBio: function(event) {
    $('#bio-pop').showPop();
    var view = App.Views.ControlPanel.BandBio.create();
    view.replaceIn("#bio-pop");
  },
  showFB: function(event) {
    $('#fb-pop').showPop();
    var view = App.Views.ControlPanel.BandFB.create();
    view.replaceIn("#fb-pop");
  },
  showTwitter: function(event) {
    $('#twitter-pop').showPop();
    var view = App.Views.ControlPanel.BandTwitter.create();
    view.replaceIn("#twitter-pop");
  },
  showLiveShows: function(event) {
    $('#live-show-pop').showPop();
    var view = App.Views.ControlPanel.BandShows.create();
    view.replaceIn("#live-show-pop");
  },
  showNews: function(event) {
    $('#news-pop').showPop();
    var view = App.Views.ControlPanel.BandNews.create();
    view.replaceIn("#news-pop");
  },
  showLogo: function(event) {
    $('#band-logo-pop').showPop();
    var view = App.Views.ControlPanel.BandLogo.create();
    view.replaceIn("#band-logo-pop");
  },
  selectLogo: function()  {
    this.$('input:file.logo-file').click();
  },
  uploadLogo: function() {
    that = this;
    console.log(this.$("input:file", "form"));
    var url = '/api/logos/upload';
    
    var csrfToken = $('meta[name=csrf-token]').prop('content');
    $.ajax(url, {
        files   : that.$("input:file", "form"),
        iframe  : true,
        async   : false,
        headers : { 'X-CSRF-Token' : csrfToken },
        // Success is being skipped by jquery-iframe-transport plugin,
        // So the hack in the error() callback.
        success : function (data, textStatus, jqXHR) {
          alert("Your file was successfully uploaded");
          var logo = $.parseJSON(jqXHR.responseText);
          //that.get('logo').set('file', logo.file)
          $('#band_logo').attr('src', logo.file.url)
          return true;
        },
        error : function (jqXHR, textStatus, errorThrown) {
          var responseText = jqXHR.responseText;
          
          if (undefined != responseText && responseText.match(/^\{.*\}$/)) {
            var logo = $.parseJSON(jqXHR.responseText);
            //that.get('logo').set('file', logo.file)
            $('#band_logo').attr('src', logo.file.url)
            return true;
          } else {
            alert("Error: The file you tried to upload did not work. Please try again.");
            return false;
          }
        }
    });
  },
});

App.Views.ControlPanel.BandLogo = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-logo",
  logoBinding: "App.Controllers.ControlPanel.band.logo",
  bandNameBinding: "App.Controllers.ControlPanel.band.details.name",
  didInsertElement: function() {
    activateSelectBox(this.$('select'));
  },
  save: function() {
    logo.saveResource();
    this.close();
  }
});

App.Views.ControlPanel.BandShows = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-live-show-list",
  liveShowList: App.Controllers.ControlPanel.liveShowList,
  scrollbar: null,
  didInsertElement: function() {
    this.scrollbar = this.$('#events').jScrollPane();
  },
  reinitializeScrollbar: function() {
    this.scrollbar.data('jsp').reinitialise();
  },
  saveLiveShows: function() {
    this.liveShowList.forEach(
      function(liveShow, index, enumerable) {
        liveShow.saveResource();
        this.close();
      }, this);
  },
  createLiveShow: function() {
    that = this;
    //Adding new Model object should be moved to controller
    var newShow = App.Models.LiveShow.create({
      day: new Date().toString("yyyy-mm-dd"),
      band_id: App.Controllers.ControlPanel.band.details._id,
      city: "",
      state: "",
      ticket_url: ""
    });
    this.liveShowList.pushObject(newShow);
    console.log(this.$('#events'));
    this.$('#events').jScrollPane();
  }
});

App.Views.ControlPanel.LiveShow = Ember.View.extend({
  templateName: 'control-panel-profile-live-show-item',
  tagName: "tr",
  didInsertElement: function () {
    this.initializeDatePicker();

    if(this.liveShow.isNew()){
      this.get('parentView').reinitializeScrollbar();
      this.$('td.venue input').focus();
    }
  },
  initializeDatePicker: function() {
    that = this;
    // TODO: Refactor Datepicker functions
    var dayPicker = this.$('input.datepicker');
    dayPicker.datepicker({
      dateFormat: 'yy-mm-dd',
      onSelect: function(dateText, inst) {
        that.liveShow.set('day', dateText);
      }
    });
    dayPicker.datepicker(
      'setDate', new Date(this.liveShow.day)
      );
  },
  erase: function() {
    if(!this.liveShow.isNew()){
      this.liveShow.destroyResource();
    } 
    App.Controllers.ControlPanel.liveShowList.removeObject(this.liveShow);
    this.destroy();
  }
});

App.Views.ControlPanel.BandNews = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-news",
  newsBinding: "App.Controllers.ControlPanel.band.details",
  didInsertElement: function() {
    activateSelectBox(this.$('select'));
  },
  save: function() {
    this.news.saveResource(App.Models.newsAttrs);
    this.close();
  }
});

App.Views.ControlPanel.BandStore = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-store",
  bandBinding: "App.Controllers.ControlPanel.band.details",
  save: function() {
    this.band.saveResource(['store_url']);
    this.close();
  }
});

App.Views.ControlPanel.BandBio = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-bio",
  bandBinding: "App.Controllers.ControlPanel.band.details",
  didInsertElement: function() {
    this.$('.textarea-scroll').jScrollPane();
  },
  save: function() {
    this.band.saveResource(['bio']);
    this.close();
  }
});

App.Views.ControlPanel.BandFB = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-fb",
  bandBinding: "App.Controllers.ControlPanel.band.details",
  save: function() {
    this.band.saveResource(['fb_url']);
    this.close();
  }
});

App.Views.ControlPanel.BandTwitter = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-profile-twitter",
  bandBinding: "App.Controllers.ControlPanel.band.details",
  save: function(){
    this.band.saveResource(['twitter_url']);
    this.close();
  }
});

/*********** Music Tab *************/

App.Views.ControlPanel.Music = Ember.View.extend({
  templateName: "control-panel-music",
  albumList: App.Controllers.ControlPanel.albumList,
  songList: App.Controllers.ControlPanel.songList,
  didInsertElement: function () {
    /* bxslider album nav */
    /*
      bxSlider uses this code to determine element widths:
        $firstChild = $parent.children(':first');
        childrenWidth = $firstChild.width();
      Metamorph's script tags will mess this up, so we're using a modified bxSlider that lets us set the selector we need.
     */
    var slider = $('#cpanel ul.albums').bxSlider({
      controls: false,
      displaySlideQty: 3,
      moveSlideQty: 1,
      infiniteLoop: false,
      hideControlOnEnd: true,
      childSelector: 'li'
    });

    $('.prev-set').click(function(){
      slider.goToPreviousSlide();
      return false;
    });
    $('.next-set').click(function(){
      slider.goToNextSlide();
      return false;
    });
  },
  addAlbum: function() {

    newAlbum = App.Models.Album.create({
      band_id: App.Controllers.ControlPanel.band.details._id,
      songs: ""
    });
    newAlbum.saveResource();
    this.albumList.pushObject(newAlbum);

    $('#album-settings-pop').showPop();
    view = App.Views.ControlPanel.AlbumSettings.create({
      album: newAlbum
    })
    view.appendTo("#album-settings-pop");

  }
});

App.Views.ControlPanel.AlbumList = Ember.View.extend({
  templateName: "control-panel-music-album-list",
  classNames: ["albums"],
  tagName: "ul",
  didInsertElement: function() {

    /* album nav selector */
    $("#albums .albums li").click(function() {
      if($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      }
    });
  }
});

App.Views.ControlPanel.AlbumListItem = Ember.View.extend({
  templateName: "control-panel-music-album-list-item",
  classNames: ["album"],
  tagName: "li",
  downloadTypeChanged: function () {
    that = this;
    if(this.album.get('selected_download_type')) {
      var downloadType = this.album.get('selected_download_type').value;

      this.album.set('download_type', downloadType);

      if(downloadType === "custom") {
        this.getCustomPrice();
      }
      else if(downloadType === "itunes") {
        this.album.set('price', "");
        this.getiTunesStoreLink();
      }
      else if(downloadType === "amazon") {
        this.album.set('price', "");
        this.getAmazonStoreLink();
      } else if(downloadType === "free") {
        this.album.set('price', 0);
      }else {
        this.album.set('price', downloadType);
      }
    }
  }.observes("album.selected_download_type"),
  getCustomPrice: function() {
    that = this;
    $("#custom-price-pop").showPop();
    view = App.Views.ControlPanel.MediaCustomPrice.create({
      media: that.album
    })
    view.replaceIn("#custom-price-pop");
  },
  getiTunesStoreLink: function() {
    $("#itunes-media-link-pop").showPop();
    view = App.Views.ControlPanel.MediaiTunesLink.create({
      media: that.album
    })
    view.replaceIn("#itunes-media-link-pop");
  },
  getAmazonStoreLink: function() {
    $("#amazon-media-link-pop").showPop();
    view = App.Views.ControlPanel.MediaAmazonLink.create({
      media: that.album
    })
    view.replaceIn("#amazon-media-link-pop");
  },
  changeAlbum: function(evt) {
    // TODO: populate with this album
    var songs = this.get('album').get('songs');
    var songsArr = [];

    $.each(songs, function(index, song) {
      songsArr.push(App.Models.Song.create(song));
    });

    App.Controllers.ControlPanel.songList.set('content', songsArr);
    App.Controllers.ControlPanel.songList.set('album_id', this.album.get('_id'));
  },

  showSettings: function(evt) {
    that = this;

    $('#album-settings-pop').showPop();
    view = App.Views.ControlPanel.AlbumSettings.create({
      album: that.get('album')
    })
    view.appendTo("#album-settings-pop");
  }
});

App.Views.ControlPanel.AlbumSettings = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-album-settings",
  didInsertElement: function() {
    activateSelectBox($("select"));
  },
  saveSettings: function() {
    this.album.saveResource();
    this.close();
  },
  deleteAlbum: function() {
    that = this;

    $('#delete-album-pop').showPop();
    view = App.Views.ControlPanel.AlbumDeleteConfirm.create({
      album: that.album
    });
    view.replaceIn('#delete-album-pop');
  }
});

App.Views.ControlPanel.AlbumDeleteConfirm = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-delete-album",
  deleteAlbum: function () {
      this.album.destroyResource();
      App.Controllers.ControlPanel.albumList.removeObject(this.album);
      this.close();
    }
});

App.Views.ControlPanel.SongList = Ember.View.extend({
  templateName: "control-panel-music-song-list",
  scrollbar: null,
  didInsertElement: function() {
    that = this;

    this.scrollbar = this.$('#songs').jScrollPane();
  },
  // TODO: this sucks. Nag the ember.js guys.
  reinitializeScrollbar: function() {
    this.scrollbar.data('jsp').reinitialise();
  },
  createSong: function() {
    that = this;
    var newSong = App.Models.Song.create({
      album_id: App.Controllers.ControlPanel.songList.get('album_id')
    });
    this.songs.pushObject(newSong);
  }
});

App.Views.ControlPanel.SongListItem = Ember.View.extend(App.Mixins.AutoSave, {
  tagName: "tr",
  didInsertElement: function() {
    console.log('inserting song');
    // this.initializeAutoSaveFor(this.song);

    if(this.song.isNew()){
      this.get('parentView').reinitializeScrollbar();
      this.$('input.name').focus();
    }

  },
  change: function(evt) {
    console.log('Song: downloadTypeChanged changed');
    if($(evt.target).hasClass('download-type')) {
      that = this;
      if(this.song.get('selected_download_type')) {
        var downloadType = this.song.get('selected_download_type').value;

        this.song.set('download_type', downloadType);

        if(downloadType === "custom") {
          this.getCustomPrice();
        }
        else if(downloadType === "itunes") {
          this.song.set('price', "");
          this.getiTunesStoreLink();
        }
        else if(downloadType === "amazon") {
          this.song.set('price', "");
          this.getAmazonStoreLink();
        } else if(downloadType === "free") {
          this.song.set('price', 0);
          this.song.saveResource();
        } else {
          this.song.set('price', downloadType);
          this.song.saveResource();
        }
      }
    } else {
      this.song.saveResource();
    }
  },
  getCustomPrice: function() {
    that = this;
    $("#custom-price-pop").showPop();
    view = App.Views.ControlPanel.MediaCustomPrice.create({
      media: that.song
    })
    view.replaceIn("#custom-price-pop");
  },
  getiTunesStoreLink: function() {
    $("#itunes-media-link-pop").showPop();
    view = App.Views.ControlPanel.MediaiTunesLink.create({
      media: that.song
    })
    view.replaceIn("#itunes-media-link-pop");
  },
  getAmazonStoreLink: function() {
    $("#amazon-media-link-pop").showPop();
    view = App.Views.ControlPanel.MediaAmazonLink.create({
      media: that.song
    })
    view.replaceIn("#amazon-media-link-pop");
  },
  uploadSong: function(e) {
    that = this;
    $("#upload-song-pop").showPop();
    view = App.Views.ControlPanel.SongUpload.create({
      song: that.song
    });
    view.replaceIn("#upload-song-pop");
  },
  setLyrics: function(evt) {
    that = this;
    $("#lyrics-pop").showPop();
    view = App.Views.ControlPanel.SongLyrics.create({
      song: that.song
    });
    view.replaceIn($("#lyrics-pop"));
  },

  deleteSong: function(view, e) {
    that = this;

    $('#delete-song-pop').showPop();
    view = App.Views.ControlPanel.SongDeleteConfirm.create({
      song: that.song
    });
    view.replaceIn('#delete-song-pop');
  },

  editSlideshow: function(view, e) {
    that = this;

    this.$('.fullscreen .selector-dropdown').removeClass('active');
    $("#slideshow-pop").showPop();
    view = App.Views.ControlPanel.SongSlideshow.create({
      song: that.song
    });
    view.replaceIn("#slideshow-pop");
  },

  editVideo: function(view, e) {
    that = this;
    this.$('.fullscreen .selector-dropdown').removeClass('active');
    $('#video-pop').showPop();
    view = App.Views.ControlPanel.SongVideo.create({
      song: that.song
    })
    view.replaceIn("#video-pop");
  }
});

App.Views.ControlPanel.SongDeleteConfirm = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-delete-song-confirm",
  deleteSong: function () {
    if(!this.song.isNew()){
      this.song.destroyResource();
    }
    App.Controllers.ControlPanel.songList.removeObject(this.song);
    this.close();
  }
})

App.Views.ControlPanel.MediaCustomPrice = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-media-custom-price",
  setCustomPrice: function() {
    this.media.saveResource(['download_type', 'price']);
    this.close();
  }
});

App.Views.ControlPanel.MediaiTunesLink = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-itunes-media-link",
  setiTunesLink: function() {
    this.media.saveResource(['download_type', 'itunes_store_link']);
    this.close();
  }
});

App.Views.ControlPanel.MediaAmazonLink = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-amazon-media-link",
  setAmazonLink: function() {
    this.media.saveResource(['download_type', 'amazon_store_link']);
    this.close();
  }
})

App.Views.ControlPanel.SongUpload = App.Views.ControlPanel.PopUp.extend({
  templateName : "control-panel-music-upload-song",
  tagName      : "div",
  startUpload  : function() {
    var form = this.$('form');
    this.song.uploadSongFile(form);
    this.close();
  },

  selectSongFile : function () {
    this.$('input:file.song-file').click();
  }

});

App.Views.ControlPanel.SongSlideshow = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-song-slideshow",
  tagName: "div",
  didInsertElement: function() {
    this.$(' .content').jScrollPane();
    this.$(' ul.images').sortable().disableSelection();
    activateSelectBox(this.$('select'));
  },
  slideshowTransitionChanged: function(evt) {
    this.song.set('slideshow_trans_time', this.$('input.transition-time').val());
  },
  transitionStyleChanged: function() {
    this.song.set('slideshow_trans_style', this.song.selected_transition_style.value);
  }.observes('song.selected_transition_style'),
  saveSlideshow: function() {
    this.song.saveResource(['slideshow_trans_time','slideshow_trans_style'])
    this.close();
  }
});

App.Views.ControlPanel.SongVideo = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-song-video",
  tagName: "div",
  didInsertElement: function() {
    this.$('.textarea-scroll').jScrollPane();
  },
  setVideo: function() {
    this.song.saveResource(['video_embed_tag']);
    this.close();
  }
})

App.Views.ControlPanel.SongLyrics = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-music-lyrics",
  didInsertElement: function() {
    this.$('.textarea-scroll').jScrollPane();
  },
  setLyrics: function() {
    console.log("saving lyrics");
    this.song.saveResource(['lyrics']);
    this.close();
  }
});

/*********** Gallery Tab *************/
App.Views.ControlPanel.Photo = Ember.View.extend({
  templateName: "control-panel-gallery-photo",
  classNames: ['image'],
  classNameBindings: ['empty'],
  empty: true,
  fileChanged: function() {
    console.log('file changed');
    if(this.photo.file) {
      console.log("has url");
      this.set('empty', false);
    }
  }.observes('photo.file'),
  tagName: "li",
  selectPhoto: function()  {
    this.$("input:file").trigger('click');
  },
  uploadPhoto: function() {
    that = this;
    console.log(this.$("input:file", "form"));
    var url = this.photo.get('uploadUrl');
    var csrfToken = $('meta[name=csrf-token]').prop('content');
    $.ajax(url, {
        files   : that.$("input:file", "form"),
        iframe  : true,
        async   : false,
        headers : { 'X-CSRF-Token' : csrfToken },
        // Success is being skipped by jquery-iframe-transport plugin,
        // So the hack in the error() callback.
        success : function (data, textStatus, jqXHR) {
          alert("Your file was successfully uploaded");
          var photo = $.parseJSON(jqXHR.responseText);
          that.get('photo').set('file', photo.file)
          return true;
        },
        error : function (jqXHR, textStatus, errorThrown) {
          var responseText = jqXHR.responseText;
          
          if (undefined != responseText && responseText.match(/^\{.*\}$/)) {
            var photo = $.parseJSON(jqXHR.responseText);
            that.get('photo').set('file', photo.file)
            return true;
          } else {
            alert("Error: The file you tried to upload did not work. Please try again.");
            return false;
          }
        }
    });
  },
  delete: function() {
    App.Controllers.ControlPanel.photoList.removeObject(this.photo);
    this.photo.destroyResource();
  }
});

App.Views.ControlPanel.Video = Ember.View.extend({
  templateName: "control-panel-gallery-video",
  classNames: ['video'],
  classNameBindings: ['empty'],
  tagName: "li",
  empty: true,
  //Change this name
  embeddedChanged: function() {
    if(this.video.get('url')) {
      this.set('empty', false);
      this.getVideoData();
    }
  }.observes('video.url'),
  orderChanged: function() {
    console.log('Order changed');
    console.log(this.video.order);
    // this.video.saveResource();
  }.observes('video.order'),
  didInsertElement: function() {
    if(this.video.get('url')) {
      this.set('empty', false);
    }
  },
  delete: function() {
    App.Controllers.ControlPanel.videoList.removeObject(this.video);
    this.video.destroyResource();
  },
  embed: function() {
    console.log('Show Embed Video');

    that=this;
    $('#embed-video-pop').showPop();
    var view = App.Views.ControlPanel.EmbedVideo.create({
      video: that.video
    });
    view.replaceIn('#embed-video-pop');
  },
  getVideoData: function() {
    var vidUrl = this.video.get('url');

    if(this.video.isNew()) {
      if(vidUrl.indexOf("vimeo") > -1) {
        this.setVimeoThumbnail(vidUrl);
      } else if(vidUrl.indexOf("youtu.be") > -1 || vidUrl.indexOf("youtube") > -1){
        this.setYoutubeThumbnail(vidUrl);
      }
    }
  },
  setYoutubeThumbnail: function(url) {
    that = this;
    var vid;

    vid = getParameterByName(url, 'v');

    this.video.set('vid_id', vid);
    this.video.set('provider', 'youtube');
    this.video.set('img_url', "http://img.youtube.com/vi/"+vid+"/1.jpg");

    $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + vid +  '?v=2&alt=json-in-script&callback=?', {}, function(data) {
      console.log(data);
      if(that.video.title == "null") {
        that.video.set('title', data.entry.title.$t);
      }
      that.video.saveResource();
      that.rerender();
    });

  },
  setVimeoThumbnail: function (url) {
    var vid;
    that = this;

    vid = url.substring(url.lastIndexOf("/") + 1);

    this.video.set('vid_id', vid);
    that.video.set('provider', 'vimeo');

    $.getJSON('http://www.vimeo.com/api/v2/video/' + vid + '.json?callback=?', {format: "json"}, function(data) {
      console.log(data);
      if(that.video.title == "null")
        that.video.set('title', data[0].title);

      that.video.set('img_url', data[0].thumbnail_small);
      that.video.saveResource();
      that.rerender();
    });

  }
});

App.Views.ControlPanel.Gallery = Ember.View.extend(App.Mixins.AutoSave, {
  templateName: "control-panel-gallery",
  tagName: "form",
  settings: App.Controllers.ControlPanel.band.gallery,
  videoList: App.Controllers.ControlPanel.videoList,
  photoList: App.Controllers.ControlPanel.photoList,
  didInsertElement: function() {
    this.$().tabs();
    this.$('div.panel').jScrollPane();

    console.log('rendered gallery')
    this.$('#gallery-photos ul.images').sortable().disableSelection();
    this.sortableVideos();

    activateSelectBox(this.$('select'));
    this.initializeAutoSaveFor(this.settings);
  },
  sortableVideos: function() {
    this.$("#gallery-videos ul.video").sortable({
      items: "li",
      update: function(evt, ui) {
        console.log('sorted')
        $.each($("#gallery-videos ul.video li.video"), function(index, elem) {
          $(elem).find("input[name='order']").val(index + 1);
        })
      }
    }).disableSelection();
  },
  transitionChanged: function(evt) {
    // Workaround for TransitionTime, binding for input type=number not working
    this.resourceIsDirty = true;
    this.settings.set('g_transition_time', this.$('input.transition-time').val());
    this.autoSave();
  },
  transitionStyleChanged: function() {
    this.settings.set('g_transition_style', this.settings.selected_transition_style.value);
  }.observes('settings.selected_transition_style'),
  addVideoSlot: function() {
    this.videoList.pushObject(App.Models.Video.create({
      band_id: App.Controllers.ControlPanel.band.details._id
    }));
  },
  addPhotoSlot: function() {
    this.photoList.pushObject(App.Models.Photo.create({
      band_id: App.Controllers.ControlPanel.band.details._id
    }));
  }
});

App.Views.ControlPanel.EmbedVideo = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-gallery-embed-video",
  tagName: "div",
  url: null,
  title: null,
  didInsertElement: function() {
    this.$('.textarea-scroll').jScrollPane();
  },
  save: function() {
    this.video.set('title',this.get('title'));
    this.video.set('url',this.get('url'));
    this.video.saveResource();
    this.close();
  }
});

/*********** Account Tab *************/

App.Views.ControlPanel.Account = Ember.View.extend(App.Mixins.AutoSave, {
  templateName: "control-panel-account",
  tagName: 'div',
  band: App.Controllers.ControlPanel.band.details,
  user: App.Controllers.ControlPanel.account.user,
  creditCard: App.Controllers.ControlPanel.account.creditCard,
  plan: App.Controllers.ControlPanel.account.plan,
  didInsertElement: function () {
    this.initializeAutoSaveFor(this.band, ['custom_domain']);
  },
  changeInfo: function() {
    $('#account-info-pop').showPop();
    var view = App.Views.ControlPanel.AccountInfo.create();
    view.replaceIn("#account-info-pop");
  },
  changeBillingInfo: function() {
    $('.popup.billing-info').showPop();
    var view = App.Views.ControlPanel.BillingInfo.create();
    view.replaceIn("#billing-info-pop");
  },
  changePlan: function() {
    $('.popup.plan').showPop();
    var view = App.Views.ControlPanel.ChangePlan.create();
    view.replaceIn("#change-plan-pop");
  },
  confirmCancelAccount: function() {
    $('#cancel-plan-pop').showPop();
    view = App.Views.ControlPanel.CancelAccount.create();
    view.replaceIn('#cancel-plan-pop');

  }
});

App.Views.ControlPanel.AccountInfo = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-account-info",
  user: App.Controllers.ControlPanel.account.user,
  band: App.Controllers.ControlPanel.band.details,
  save: function(){
    this.user.saveResource();
    this.band.saveResource(['name', 'spindle_url']);
    this.close();
  }
});

App.Views.ControlPanel.BillingInfo = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-account-billing-info",
  creditCard: App.Controllers.ControlPanel.account.creditCard,
  didInsertElement: function() {
    activateSelectBox(this.$('select'));
    $('a.security-code').click(function() {
      $('.popup.security-code').showPop();
    });
    $('a.confirm-plan').click(function() {
      $('.popup.confirm-plan').showPop();
    });

  },
  save: function(){
    this.creditCard.saveResource();
    this.close();
  }
});

App.Views.ControlPanel.ChangePlan = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-account-change-plan",
  availablePlans: App.Controllers.ControlPanel.appConstants.plans,
  user: App.Controllers.ControlPanel.account.user,
  plan: App.Controllers.ControlPanel.account.plan,
  confirmPlanChange: function() {
    this.$('.popup.confirm-plan').showPop();
  },
  confirmCancelAccount: function() {
    $('#cancel-plan-pop').showPop();
    view = App.Views.ControlPanel.CancelAccount.create();
    view.replaceIn('#cancel-plan-pop');
  },
  savePlan: function() {
    var selectedPlanID = this.$("li.plan.active input[name='plan_id']").val();

    that=this;
    $.each(this.availablePlans.content, function(index, availablePlan){
      if(availablePlan._id == selectedPlanID) {
        $.each(availablePlan, function(key,val) {
          that.plan.set(key, val);
        });
      that.user.set('plan_id', availablePlan._id);
      }
    });
    this.user.saveResource(['plan_id']);

    this.$('.popup.confirm-plan').showPop();
    this.close();
  },
  closeConfirmPlanChange: function () {
    this.$('.popup.confirm-plan').showPop();
  }
  
});

App.Views.ControlPanel.Plan = Ember.View.extend({
  tagName: 'li',  
  classNames: ['plan'],
  user: App.Controllers.ControlPanel.account.user,
  didInsertElement: function() {
    if(this.user.get('plan_id') == this.info._id)
      this.$().addClass('active');
  },
  imgUrl: Ember.computed(function() {
    return "i/popups/plan-" + this.info.name +".png";
  }).property('info.name'),
  capName: Ember.computed(function(){
    return capitalize(this.info.name);
  }).property('info.name'),
  selectPlan: function(evt) {
    this.$().siblings().removeClass('active');
    this.$().addClass('active');
  }
});

App.Views.ControlPanel.CancelAccount = App.Views.ControlPanel.PopUp.extend({
  templateName: "control-panel-account-cancel-plan",
  user: App.Controllers.ControlPanel.account.user,
  cancelAccount: function() {
    this.user.set('status', "cancelled");
    this.user.saveResource(['status']);
    this.close();
  }
});
