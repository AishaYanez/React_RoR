class Api::V1::Activities::ActivitiesController < ApplicationController
  before_action :set_activity, only: %i[ show update destroy ]

  def add_users
    activity = Activity.find(params[:id])
    user_ids = params[:user_ids]

    activity.users << Employee.where(id: user_ids)

    render json: { message: "Empleados agregados a la actividad con éxito" }
  end

  # GET /activities
  def index
    @activities = Activity.all

    render json: @activities
  end

  # GET /activities/1
  def show
    render json: @activity
  end

  # POST /activities
  def create
    @activity = Activity.new(activity_params)

    if @activity.save
      render json: @activity, status: :created
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /activities/1
  def update
    if @activity.update(activity_params)
      render json: @activity
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /activities/1
  def destroy
    @activity.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_activity
    @activity = Activity.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def activity_params
    params.require(:activity).permit(:name, :description, :date, :places, :image, :user_id, :users_ids)
  end
end
