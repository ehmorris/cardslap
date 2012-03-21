class Share < ActiveRecord::Base
  validates :deck_id, :presence => true
  validates :email, :presence => true, :uniqueness => {:scope => :deck_id}

  belongs_to :deck
end
