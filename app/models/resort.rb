class Resort < ActiveRecord::Base
	reverse_geocoded_by :latitude, :longitude
	attr_accessible :name, :latitude, :longitude
	paginates_per 6
end
