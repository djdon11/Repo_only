class ResortsController < ApplicationController
  # GET /resorts
  # GET /resorts.json
  def index
    
		if params.has_key?(:latitude) and params.has_key?(:longitude)
			@resorts = Resort.near([params[:latitude],params[:longitude]] , 100, :order => :distance).page params[:page]
		else
			@resorts = Resort.page params[:page]
		end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @resorts }
    end
  end

  # GET /resorts/1
  # GET /resorts/1.json
  def show
    @resort = Resort.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @resort }
    end
  end

  # GET /resorts/new
  # GET /resorts/new.json
  def new
    @resort = Resort.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @resort }
    end
  end

  # GET /resorts/1/edit
  def edit
    @resort = Resort.find(params[:id])
  end

  # POST /resorts
  # POST /resorts.json
  def create
    @resort = Resort.new(params[:resort])

    respond_to do |format|
      if @resort.save
        format.html { redirect_to @resort, notice: 'Resort was successfully created.' }
        format.json { render json: @resort, status: :created, location: @resort }
      else
        format.html { render action: "new" }
        format.json { render json: @resort.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /resorts/1
  # PUT /resorts/1.json
  def update
    @resort = Resort.find(params[:id])

    respond_to do |format|
      if @resort.update_attributes(params[:resort])
        format.html { redirect_to @resort, notice: 'Resort was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @resort.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /resorts/1
  # DELETE /resorts/1.json
  def destroy
    @resort = Resort.find(params[:id])
    @resort.destroy

    respond_to do |format|
      format.html { redirect_to resorts_url }
      format.json { head :no_content }
    end
  end
end
