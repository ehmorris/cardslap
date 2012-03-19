class Card < ActiveRecord::Base
  belongs_to :deck

  comma do
    front
    back
  end
end
