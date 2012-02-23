Cardslap::Application.routes.draw do
  root :to => "decks#index"
  resources :decks, only: [:index, :create, :show, :destroy] do
    resources :cards, only: [:new, :create, :destroy]
  end
end
