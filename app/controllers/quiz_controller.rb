class QuizController < ApplicationController
  before_filter :authorize

  def index
    @quiz = true
    @user = current_user
    @deck = @user.decks.find(params[:deck_id])
    @cards = @deck.cards
  end
end
