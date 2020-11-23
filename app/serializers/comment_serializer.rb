class CommentSerializer
  include JSONAPI::Serializer
  attributes :score, :remark
end
