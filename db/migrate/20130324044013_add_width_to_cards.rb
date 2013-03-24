class AddWidthToCards < ActiveRecord::Migration
  def change
    add_column :cards, :width, :int
  end
end
