class Deck < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => {:scope => :user_id}
  has_many :cards, :dependent => :destroy, :order => 'sort_number'

  extend FriendlyId
  belongs_to :user
  friendly_id :name, :use => :scoped, :scope => :user

  def should_generate_new_friendly_id?
    new_record?
  end
end
