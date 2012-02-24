class Deck < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => true
  has_many :cards

  extend FriendlyId
  friendly_id :name, use: :slugged

  def should_generate_new_friendly_id?
    new_record?
  end
end
