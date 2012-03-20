class CreateShares < ActiveRecord::Migration
  def change
    create_table :shares do |t|
      t.integer :deck_id
      t.string :email

      t.timestamps
    end
  end
end
