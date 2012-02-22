class Deck < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => true
  has_many :cards
end
