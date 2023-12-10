class Api::V1::Activities::ActivitiesController < ApplicationController
  before_action :set_activity, only: %i[ show update destroy ]

  # def add_employees
  #   activity = Activity.find(params[:id])
  #   employee_ids = params[:employee_ids]

  #   new_employees = Employee.where(id: employee_ids).where.not(id: activity.user_id).where.not(id: activity.employee_ids)

  #   if new_employees.any? && activity.employees.concat(new_employees)
  #     render json: { message: "Empleados agregados a la actividad con éxito" }
  #   else
  #     render json: { message: "Algo falla" }
  #   end
  # end

  def add_employees(activity)
    employee_ids = params[:employee_ids]

    new_employees = Employee.where(id: employee_ids).where.not(id: activity.user_id).where.not(id: activity.employee_ids)

    activity.employees.replace(new_employees)
  end

  def add_clients
    activity = Activity.find(params[:id])
    client_ids = params[:client_id]

    new_clients = Client.where(id: client_ids).where.not(id: activity.user_id)

    if new_clients.any? && activity.clients.concat(new_clients)
      render json: @activity
    else
      render json: @activity
      render json: { message: "Algo falla" }
    end
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
      add_employees(@activity)
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /activities/1
  def update
    if @activity.update(activity_params)
      add_employees(@activity)
      render json: @activity, status: :ok
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
    params.require(:activity).permit(:name, :description, :date, :places, :image, :user_id, :employee_ids, :client_id)
  end
end
