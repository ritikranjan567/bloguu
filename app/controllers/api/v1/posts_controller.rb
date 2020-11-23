class Api::V1::PostsController < ApplicationController
  include PostsHelper
  before_action :set_page_number, only: :index
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :find_post, only: [:update, :show, :destroy]
  
  def index
    @post = Post.get_posts_per_page(@page)
    
    render json: PostSerializer.new(@post, meta: {pagination_limit: pagination_limit})
  end

  def create
    @post = Post.new(post_params)
    @post.user = @current_user
    if @post.save
      render json: PostSerializer.new(@post)
    else
      render json: {error: @post.errors.full_messages}, status: 422
    end
  end

  def show
    render json: PostSerializer.new(@post, {include: %i[comments]})
  end

  def update
    if @post.update(post_params)
      render json: PostSerializer.new(@post)
    else
      render json: {error: @post.errors.full_messages}, status: 422
    end
  end

  def destroy
    if @post.destroy
      render json: {}
    else
      render json: {error: "Unable to delete"}, status: 422
    end
  end

  private
  def post_params
    params.permit(:title, :content)
  end

  def find_post
    @post = Post.find(params[:id])
  end
end