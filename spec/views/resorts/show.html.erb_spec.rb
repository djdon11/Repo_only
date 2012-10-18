require 'spec_helper'

describe "resorts/show" do
  before(:each) do
    @resort = assign(:resort, stub_model(Resort,
      :name => "Name",
      :latitude => 1.5,
      :longitude => 1.5
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/1.5/)
    rendered.should match(/1.5/)
  end
end
