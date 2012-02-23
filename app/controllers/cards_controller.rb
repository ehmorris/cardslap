class CardsController < ApplicationController
  helper :all

  def new
    @deck = Deck.find(params[:deck_id])
    @card = Card.new
  end

  def create
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.build(params[:card])
    @card.save
    redirect_to @deck
  end

  def destroy
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.build(params[:card])
    @card.destroy
    redirect_to @deck
  end
end
