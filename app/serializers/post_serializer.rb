class PostSerializer
  include JSONAPI::Serializer
  attributes :title, :content, :created_at, :avg_score, :author_name
  has_many :comments
  belongs_to :user
end
