require 'spec_helper'

describe Resort do
	
	it "returns hash of resorts with ascending distance" do
		lat = 45.4216
    long = 6.64316
    
    Resort.search(lat,long).should == Resort.near([lat,long] , 100, :order => :distance)
  end
	
	it "returns hash of resorts" do
		lat = 0
    long = 0
    
    Resort.search(lat,long).should == Resort
  end
end