class DecksController < ApplicationController
  def index
    @deck = Deck.new
    @decks = Deck.all
  end

  def create
    @deck = Deck.new(params[:deck])
    @deck.save
    redirect_to decks_path
  end

  def show
    @deck = Deck.find(params[:id])
    @cards = @deck.cards
  end

  def destroy
    @deck = Deck.find(params[:id])
    @deck.destroy
    redirect_to decks_path
  end
end
