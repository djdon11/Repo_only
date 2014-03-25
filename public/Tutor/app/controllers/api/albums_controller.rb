class Api::AlbumsController < ApplicationController
  respond_to :json

	def create
    @album = Album.new(params[:album])
    # TODO: @album.band = current_user.band
    
    if @album.save
      respond_with @album, status: :created, location: api_album_path(@album)
    else
      respond_with @album, status: :unprocessable_entity
    end
  end

  def update
    @album = Album.find(params[:id])

      if @album.update_attributes(params[:album])
        respond_with(@album)
      else
        respond_with @album.errors, status: :unprocessable_entity
      end
  end

   def destroy
    @album = Album.find(params[:id])
    @album.destroy

    respond_with(@album)
  end

end
