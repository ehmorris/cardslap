class Share < ActiveRecord::Base
  validates :deck_id, :presence => true
  validates :email, :presence => true, :uniqueness => {:scope => :deck_id}
  validates_email_format_of :email

  belongs_to :deck
end
