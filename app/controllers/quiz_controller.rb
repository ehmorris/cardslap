class QuizController < ApplicationController
  before_filter :authorize

  def index
    @user = current_user
    @deck = @user.decks.find(params[:deck_id])
    @cards = @deck.cards
  end
end
