class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by!(email: params[:email])
    if @user.authenticate(params[:password])
      payload = {user_id: @user.id}
      token = JsonWebToken.encode(payload)
      render json: UserSerializer.new(@user, meta: {token: token}).to_json
    else
      render json: {error: "Invalid password"}, status: :unauthorized
    end
  end
end