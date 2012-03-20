class SharesController < ApplicationController
  before_filter :authorize

  def new
    @deck = current_user.decks.find(params[:deck_id])
    @shares = @deck.shares
    @share = Share.new
  end

  def create
    @deck = current_user.decks.find(params[:deck_id])
    @share = @deck.shares.build(params[:share])
    @share.save
    redirect_to new_deck_share_path(@deck)
  end
end
