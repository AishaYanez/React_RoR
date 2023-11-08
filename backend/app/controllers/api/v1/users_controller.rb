class Api::V1::UsersController < ApplicationController

  before_action :set_user, only: [:show, :update, :destroy]
  
    def index
      @users = User.all
      render json: @users
    end

  def show
    if @user
      auth_password = params[:password]
      if @user.password == auth_password
        render json: @user
      else
        render json: { error: "La contraseña no es correcta" }
        # , status: :unauthorized ESTO ES CON bcryp
      end
    else 
      render json: { error: "Usuario no encontrado" }, status: :not_found
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user, status: :update
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    if @user.destroy
      render json: @user, status: :destroy
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end


  private
  def set_user
    # myDatas = params[:clave].split(':',-1)
    # @password = myDatas[1]
    # @user = User.find_by(myDatas[0])

    @user = User.find_by(email: params[:email])
  end 
  def user_params
    params.require(:user).permit(:nickname, :email, :password, :img)
  end

end
