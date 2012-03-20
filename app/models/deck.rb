class Deck < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => {:scope => :user_id}
  has_many :cards, :dependent => :destroy, :order => 'sort_number'
  has_many :shares, :dependent => :destroy

  extend FriendlyId
  belongs_to :user
  friendly_id :name, :use => :scoped, :scope => :user

  def should_generate_new_friendly_id?
    new_record?
  end
end
