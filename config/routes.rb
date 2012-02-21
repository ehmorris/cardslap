Cardslap::Application.routes.draw do
  root :to => "decks#index"
  resources :decks, only: [:index, :new, :create, :show, :destroy] do
    resources :cards, only: [:new, :create]
  end
end
