class User < ApplicationRecord
  has_secure_password
  has_many :posts, dependent: :destroy

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, confirmation: true, length: {minimum: 6}
end
