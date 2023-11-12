class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    if @user
      auth_data = Base64.decode64(params[:key]).split(":", 2)
      auth_password = auth_data[1]
      if @user.password == auth_password
        render json: @user, status: :ok
      else
        render json: { error: "Autenticación fallida" }, status: :unauthorized
      end
    else
      render json: { error: "Usuario no encontrado" }, status: :not_found
    end
  end

  def create
    emailExists = User.find_by(email: user_params[:email])
    if !emailExists
      nicknameExists = User.find_by(nickname: user_params[:nickname])
      if !nicknameExists
        @user = User.new(user_params)
        if @user.save
          render json: @user, status: :created
        else
          render json: { error: @user.errors.full.messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Nickname ya en uso" }, status: :unprocessable_entity
      end
    else
      render json: { error: "Usuario ya existente" }, status: :unprocessable_entity
    end
  end

  def update
    if @user
      auth_data = params[:key].split(":", 2)
      auth_password = auth_data[1]
      if @user.password == auth_password
        if @user.update(user_params)
          render json: @user, status: :ok
        else
          render json: { error: @user.errors.full.messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Autenticación fallida" }, status: :unauthorized
      end
    else
      render json: { error: "Usuario no encontrado" }, status: :not_found
    end
  end

  def destroy
    if @user
      auth_data = params[:key].split(":", 2)
      auth_password = auth_data[1]
      if @user.password == auth_password
        if @user.destroy
          render json: @user, status: :ok
        else
          render json: { error: @user.errors.full.messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Autenticación fallida" }, status: :unauthorized
      end
    else
      render json: { error: "Usuario no encontrado" }, status: :not_found
    end
  end

  private

  def set_user
    auth_data = Base64.decode64(params[:key]).split(":", 2)
    @user = User.find_by(email: auth_data[0])
  end

  def user_params
    params.require(:user).permit(:nickname, :email, :password, :img)
  end
end
