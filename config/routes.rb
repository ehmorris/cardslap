Cardslap::Application.routes.draw do
  root :to => "decks#index"
  resources :users, :controller => 'clearance/users' do
    resources :decks, only: [:index, :create, :show, :destroy, :update, :edit] do
      resources :cards
    end
  end
end
