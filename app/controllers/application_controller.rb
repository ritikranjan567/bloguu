class ApplicationController < ActionController::Base
  include ApplicationHelper
  protect_from_forgery with: :null_session
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found(e)
    render json: { error: e.message }, status: 404
  end
end
