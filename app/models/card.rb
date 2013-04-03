class Card < ActiveRecord::Base
  belongs_to :deck
  after_initialize :init

  def init
    self.sort_number ||= 0
  end

  comma do
    front
    back
  end
end
