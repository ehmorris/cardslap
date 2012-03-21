class DecksController < ApplicationController
  before_filter :authorize

  def index
    @user = current_user
    @deck = Deck.new
    @shares = Share.find_all_by_email(@user.email)
    @shared_decks = []
    @shares.each do |share|
      @shared_deck = Deck.find_by_id(share.deck_id)
      @shared_deck[:share_id] = share.id
      @shared_decks.push(@shared_deck);
    end
    @decks = @user.decks
  end

  def create
    @user = current_user
    @deck = @user.decks.build(params[:deck])
    if (!@deck.invalid?(:name))
      @deck.save
      redirect_to new_deck_card_path(@deck)
    else
      redirect_to decks_path
      @deck.errors.messages.each do |msg|
        flash[:notice] = msg.last.last.capitalize
      end
    end
  end

  def show
    @user = current_user
    @deck = @user.decks.find(params[:id])
    @cards = @deck.cards

    respond_to do |format|
      format.html
      format.csv {
        render :csv => @cards, :filename => @deck.slug
      }
    end
  end

  def destroy
    @user = current_user
    @deck = @user.decks.find(params[:id])
    @deck.destroy
    redirect_to decks_path
  end

  def edit
    @user = current_user
    @deck = @user.decks.find(params[:id])
    @shares = @deck.shares
  end

  def update
    @user = current_user
    @deck = @user.decks.find(params[:id])

    if @deck.update_attributes(params[:deck])
      redirect_to decks_path
    else
      render :edit
    end
  end
end
