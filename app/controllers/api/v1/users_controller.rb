class Api::V1::UsersController < ApplicationController
  before_action :authorize_request, only: [:update, :destory]

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

  end

  def destroy
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def update_params
    params.permit(:first_name, :last_name, :email)
  end
end