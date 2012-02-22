class Deck < ActiveRecord::Base
  validates :name, :presence => true
  has_many :cards
end
