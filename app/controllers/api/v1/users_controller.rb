class Api::V1::UsersController < ApplicationController
  before_action :authorize_request, only: [:update, :destory, :change_password]

  def create
    @user = User.new(user_params)
    if @user.save
      payload = {user_id: @user.id}
      token = JsonWebToken.encode(payload)
      render json: UserSerializer.new(@user, meta: {token: token}).to_json
    else
      render json: {error: @user.errors.full_messages}, status: 422
    end
  end

  def show
    @user = User.find(params[:id])

    render json: UserSerializer.new(@user).to_json
  end

  def update
    if @current_user.update(update_params)
      render json: UserSerializer.new(@current_user).to_json
    else
      render json: { error: @current_user.errors.full_messages }, status: 422
    end
  end

  def destroy
    if @current_user.destroy
      render json: {}, status: 200
    else
      render json: { error: 'Profile could not be deleted due to some problem' }, status: 422
    end
  end

  def change_password
    if @current_user.authenticate(params[:old_password])
      if @current_user.update(password_params)
        render json: { success: "Password has been changed successfully" }, status: 200
      else
        render json: { error: @current_user.errors.full_messages }, status: 422
      end
    else
      render json: { error: ['Invalid old Password'] }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def update_params
    params.permit(:first_name, :last_name, :email)
  end

  def password_params
    params.permit(:password, :password_confirmation)
  end

end