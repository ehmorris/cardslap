Cardslap::Application.routes.draw do
  root :to => 'home#index'

  resources :decks do
    resources :cards
    resources :shares, :only => [:new, :create, :destroy, :show]
    resources :quiz, :only => [:index]
  end

  resources :passwords,
    :controller => 'clearance/passwords',
    :only       => [:new, :create]

  resource  :session,
    :controller => 'clearance/sessions',
    :only       => [:new, :create, :destroy]

  resources :users, :controller => 'clearance/users' do
    resource :password,
      :controller => 'clearance/passwords',
      :only       => [:create, :edit, :update]
  end

  match 'sign_up'  => 'clearance/users#new', :as => 'sign_up'
  match 'sign_in'  => 'clearance/sessions#new', :as => 'sign_in'
  match 'sign_out' => 'clearance/sessions#destroy', :via => :delete, :as => 'sign_out'
  match 'account'  => 'clearance/users#edit'
end
