class Api::BandsController < ApplicationController
	respond_to :json

	def show
		@band = Band.includes(:live_shows, :logo).last
		respond_with @band, :include => [:live_shows, :logo]
	end

	def update
    band = Band.find(params[:id])

    if band.update_attributes(params[:band])
			respond_with(band, :location => api_band_path(band), api: true)
		else
			respond_with(band, api: true)
		end
	end

end
