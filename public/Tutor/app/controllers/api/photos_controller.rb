class Api::PhotosController < ApplicationController
  respond_to :json

  #TODO: Fix Javascript AJAX upload returning HTML instead of JSON.
  skip_before_filter :verify_authenticity_token, only: :upload

  def upload
  	logger.debug params

  	@photo = Photo.new
    @photo.band = current_user.band
  	@photo.file = params[:photo][:file]
  	@photo.save

    respond_to do |format|
      format.html { render layout: false }
      format.json { render @photo }
    end

  end

  def destroy
    @photo = Photo.find(params[:id])
    respond_with @photo.destroy
  end

end