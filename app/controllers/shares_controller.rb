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

  def create
    @deck = current_user.decks.find(params[:deck_id])
    @share = @deck.shares.build(params[:share])
    email_errors = ValidatesEmailFormatOf::validate_email_format @share.email

    if @deck.shares.count < 5
      if !Share.find_by_email_and_deck_id @share.email, @deck.id and email_errors.nil? and @share.email != current_user.email
        @share.save
        ::ClearanceMailer.new_share(current_user, @share.email, @deck, @share).deliver
      else
        flash[:notice] = "The email #{@share.email} is invalid"
      end
    else
      flash[:notice] = 'Can only share a deck with up to 5 people'
    end
  end

  def destroy
    @share = Share.find_by_id(params[:id])
    @share.destroy
  end
end
