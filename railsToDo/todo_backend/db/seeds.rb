# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Todo.create({todo_title: "Wash clothes", todo_tag:"personal", completed: false, due_date: "27-12-2020"})
Todo.create({todo_title: "Buy eggs", todo_tag:"personal", completed: false, due_date: "29-12-2020"})
Todo.create({todo_title: "Complete proposal", todo_tag:"school", completed: false, due_date: "28-12-2020"})

p Todo.all