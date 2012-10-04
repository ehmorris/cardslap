class SharesController < ApplicationController
  before_filter :authorize

  def show
    @share = Share.find_by_id(params[:id])
    if @share.email == current_user.email
      @deck = Deck.find_by_id(params[:deck_id])
      @cards = @deck.cards
    else
      redirect_to decks_path
    end
  end

  def new
    @deck = current_user.decks.find(params[:deck_id])
    @shares = @deck.shares
    @share = Share.new
  end

  def create
    @deck = current_user.decks.find(params[:deck_id])
    if @deck.shares.count < 5
      @share = @deck.shares.build(params[:share])
      @share.save
      ::ClearanceMailer.new_share(current_user, params[:share][:email], @deck, @share).deliver
      redirect_to new_deck_share_path(@deck)
    else
      redirect_to new_deck_share_path(@deck)
      flash[:notice] = 'Can only share a deck with up to 5 people'
    end
  end

  def destroy
    @share = Share.find_by_id(params[:id])
    @share.destroy
    redirect_to :back
  end
end
