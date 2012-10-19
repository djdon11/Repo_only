class Resort < ActiveRecord::Base
	reverse_geocoded_by :latitude, :longitude
	attr_accessible :name, :latitude, :longitude
	paginates_per 6
	
	def self.search(latitude='',longitude='')
		if latitude.to_f > 0 && longitude.to_f > 0
			return Resort.near([latitude,longitude] , 100, :order => :distance)
		end
		return Resort
	end
	
end