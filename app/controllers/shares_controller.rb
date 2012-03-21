class SharesController < ApplicationController
  before_filter :authorize

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
      ::ClearanceMailer.new_share(current_user, params[:share][:email], @deck).deliver
      redirect_to new_deck_share_path(@deck)
    else
      redirect_to new_deck_share_path(@deck)
      flash[:notice] = 'Can only share a deck with up to 5 people'
    end
  end

  def destroy
    @deck = current_user.decks.find(params[:deck_id])
    @share = @deck.shares.find(params[:id])
    @share.destroy
    redirect_to new_deck_share_path(@deck)
  end
end
