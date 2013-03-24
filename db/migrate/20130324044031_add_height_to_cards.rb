class AddHeightToCards < ActiveRecord::Migration
  def change
    add_column :cards, :height, :int
  end
end
