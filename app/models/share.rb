class Share < ActiveRecord::Base
  validates :deck_id, :presence => true
  validates :email, :presence => true

  belongs_to :deck
end
