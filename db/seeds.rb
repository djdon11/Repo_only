# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require "csv"

resorts_file = "#{Rails.root}/db/seed_data/resorts.csv"

begin
	p "Creating Resorts..."
	Resort.delete_all
	resorts = CSV.read(resorts_file, :headers => true, :header_converters => :symbol)
	resorts.each do |row|
		Resort.create!(:name => row[0], :latitude => row[1], :longitude => row[2])
	end
	p "Successfully Created Resorts"
end
