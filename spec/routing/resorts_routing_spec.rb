require "spec_helper"

describe ResortsController do
  describe "routing" do

    it "routes to #index" do
      get("/resorts").should route_to("resorts#index")
    end

    it "routes to #new" do
      get("/resorts/new").should route_to("resorts#new")
    end

    it "routes to #show" do
      get("/resorts/1").should route_to("resorts#show", :id => "1")
    end

    it "routes to #edit" do
      get("/resorts/1/edit").should route_to("resorts#edit", :id => "1")
    end

    it "routes to #create" do
      post("/resorts").should route_to("resorts#create")
    end

    it "routes to #update" do
      put("/resorts/1").should route_to("resorts#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/resorts/1").should route_to("resorts#destroy", :id => "1")
    end

  end
end
