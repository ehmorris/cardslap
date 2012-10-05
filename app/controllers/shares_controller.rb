class SharesController < ApplicationController
  before_filter :authorize, :except => [:show]

  def show
    if signed_in?
      @share = Share.find_by_id(params[:id])
      if @share.email == current_user.email
        @deck = Deck.find_by_id(params[:deck_id])
        @cards = @deck.cards
      elsif params['email']
        redirect_to decks_path
        flash[:notice] = "It looks like this deck hasn't been shared with you. It was shared with #{params['email']}."
      else
        redirect_to decks_path
      end
    else
      redirect_to :controller => 'clearance/users', :action => 'new', :email => params['email']
      if params['email']
        flash[:notice] = "This deck was shared with #{params['email']}. You'll have to login with that account, or create an account with the email. We've filled in the sign-up form for you."
      end
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
