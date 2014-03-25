App.Views.Background = Ember.View.extend({
  photoList: App.Controllers.ControlPanel.photoList
  transTimeBinding: 'App.Controllers.ControlPanel.band.gallery.g_transition_time'
  transStyleBinding: 'App.Controllers.ControlPanel.band.gallery.g_transition_style'

  didInsertElement: ->
    this.activateBkSlider()
  
  transTimeChanged: Ember.observer(->
      console.log('transTime changed')
      this.activateBkSlider()
    ,'transTime')

  transStyleChanged: Ember.observer(->
      console.log('transStyle changed')
      this.activateBkSlider()
    ,'transStyle')

  photoUrls: ->
    list = []
    photos = this.photoList.get('content')
    list = (photo.file.url for photo in photos when typeof(photo.file) != "undefined")

    return list

  activateBkSlider: ->

    switch this.transStyle
      when "normal"
        easeIn = easeOut = "";
        enter = exit = {left:0,opacity:100};
      when "slide"
        easeIn = easeOut = "swing";
        enter = {left:0,opacity:0};
        exit = {left:3000,opacity:100};
      when "fade"
        easeIn = 'ease-in';
        easeOut = 'ease-out';
        enter = exit = {left:0,opacity:0};

    $.mbBgndGallery.buildGallery({
      containment:"body",
      timer: this.transTime * 1000,
      effTimer:3000,
      images: this.photoUrls(),
      activateKeyboard: false,
      effect: {enter:enter,exit:exit, enterTiming:easeIn, exitTiming:easeOut}
    });
})