module PostsHelper
  def set_page_number
    @page = params[:page] || 0
  end

  def pagination_limit
    (Post.all.size / 4.0).ceil
  end
end