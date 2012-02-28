Cardslap::Application.routes.draw do
  root :to => "decks#index"

  resources :decks, only: [:index, :create, :show, :destroy, :update, :edit] do
    resources :cards
  end

  resources :passwords,
    :controller => 'clearance/passwords',
    :only       => [:new, :create]

  resources :users, :controller => 'clearance/users', :only => [:new, :create] do
    resource :password,
      :controller => 'clearance/passwords',
      :only       => [:create, :edit, :update]
  end
end
