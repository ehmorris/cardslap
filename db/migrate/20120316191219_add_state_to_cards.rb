class AddStateToCards < ActiveRecord::Migration
  def change
    add_column :cards, :sort_number, :integer
    add_column :cards, :bin, :string, :default => 'main'
  end
end
