require 'spec_helper'

describe "resorts/edit" do
  before(:each) do
    @resort = assign(:resort, stub_model(Resort,
      :name => "MyString",
      :latitude => 1.5,
      :longitude => 1.5
    ))
  end

  it "renders the edit resort form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => resorts_path(@resort), :method => "post" do
      assert_select "input#resort_name", :name => "resort[name]"
      assert_select "input#resort_latitude", :name => "resort[latitude]"
      assert_select "input#resort_longitude", :name => "resort[longitude]"
    end
  end
end
