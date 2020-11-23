# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.create!([{
  title: "Test Post One",
  content: "This is the test content of test post one. Please, delete or don't anything with it as you like",
  user_id: User.first.id
}, {
  title: "Test Post Two",
  content: "This is the test content of test post two. Please, delete or don't anything with it as you like",
  user_id: User.first.id
}, {
  title: "Test Post Three",
  content: "This is the test content of test post three. Please, delete or don't anything with it as you like",
  user_id: User.first.id
}])