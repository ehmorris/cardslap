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
    @card = @deck.cards.find(params[:id])
    @card.destroy

    redirect_to @deck
  end

  def edit
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.build(params[:card])
  end

  def update
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.build(params[:card])

    if @card.update_attributes(params[:card])
      redirect_to @deck
    else
      render :edit
    end
  end
end
