class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.text :front
      t.text :back

      t.timestamps
    end
  end
end
