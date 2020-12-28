class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :todo_title
      t.date :due_date
      t.string :todo_tag

      t.timestamps
    end
  end
end
