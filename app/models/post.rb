class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user

  validates :title, presence: true, length: {maximum: 50}
  validates :content, presence: true, length: {minimum: 20, maximum: 1500}  
  
  def self.get_posts_per_page(page_number)
    order(created_at: :desc).offset(page_number.to_i * 4).limit(4)
  end

  def avg_score
    avg = self.comments.average(:score).to_f.floor(2)
    return avg if avg
    0.0
  end

  def author_name
    self.user.first_name + " " + self.user.last_name
  end
end
