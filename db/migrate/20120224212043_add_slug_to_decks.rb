class AddSlugToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :slug, :string
  end
end
