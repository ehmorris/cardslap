class HomeController < ApplicationController
  def index
    if signed_in?
      redirect_to decks_path
    else
      redirect_to sign_up_path
    end
  end
end
