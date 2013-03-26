class CardsController < ApplicationController
  helper :all
  before_filter :authorize

  def new
    @deck = current_user.decks.find(params[:deck_id])
    @card = Card.new
  end

  def create
    @deck = current_user.decks.find(params[:deck_id])
    @card = @deck.cards.build(params[:card])
    @card.save
    redirect_to @deck
  end

  def destroy
    @deck = current_user.decks.find(params[:deck_id])
    @card = @deck.cards.find(params[:id])
    @card.destroy
    redirect_to @deck
  end

  def edit
    @deck = current_user.decks.find(params[:deck_id])
    @card = @deck.cards.find(params[:id])
  end

  def update
    @deck = current_user.decks.find(params[:deck_id])
    @card = @deck.cards.find(params[:id])

    # make sure the user isn't updating someone else's cards via a shared deck
    @shares = Share.find_all_by_email(current_user.email)
    shared_flag = false;
    @shares.each do |share|
      if share.deck_id == @deck.id
        shared_flag = true
      end
    end

    if !shared_flag
      if @card.update_attributes(params[:card])
        redirect_to @deck
      else
        render :edit
      end
    end
  end
end
