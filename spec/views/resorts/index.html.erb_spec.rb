require 'spec_helper'

describe "resorts/index" do
  before(:each) do
    assign(:resorts, [
      stub_model(Resort,
        :name => "Name",
        :latitude => 1.5,
        :longitude => 1.5
      ),
      stub_model(Resort,
        :name => "Name",
        :latitude => 1.5,
        :longitude => 1.5
      )
    ])
  end

  it "renders a list of resorts" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
  end
end
