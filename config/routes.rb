Cardslap::Application.routes.draw do
  root :to => "decks#index"
  resources :decks, only: [:index, :create, :show] do
    resources :cards, only: [:new, :create]
  end
end
