class DecksController < ApplicationController
  before_filter :authorize

  def index
    @user = User.find(current_user.id)
    @deck = Deck.new
    @decks = @user.decks
  end

  def create
    @user = User.find(current_user.id)
    @deck = @user.decks.build(params[:deck])
    @deck.save
    redirect_to new_deck_card_path(@deck)
  end

  def show
    @user = User.find(current_user.id)
    @deck = @user.decks.find(params[:id])
    @cards = @deck.cards
  end

  def destroy
    @user = User.find(current_user.id)
    @deck = @user.decks.find(params[:id])
    @deck.destroy
    redirect_to decks_path
  end

  def edit
    @user = User.find(current_user.id)
    @deck = @user.decks.find(params[:id])
  end

  def update
    @user = User.find(current_user.id)
    @deck = @user.decks.find(params[:id])

    if @deck.update_attributes(params[:deck])
      redirect_to decks_path
    else
      render :edit
    end
  end
end
