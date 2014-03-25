Spindal::Application.routes.draw do
  devise_for :users

  get 'uploads' => 'uploads#new'

  resources :albums do
    collection do
      get :test
    end
  end

  resources :app_constants, :only => [:index]

  namespace :api do
    resources :users, :only => [:update]
    resources :credit_cards, :only => [:update]
    resources :bands, :only => [:show, :update]
    resources :live_shows, :except => [:new, :edit]
    resources :logos, :except => [:new, :edit] do
      post 'upload', on: :collection
    end
    resources :videos, :except => [:new, :edit]
    resources :songs, :except => [:new, :edit] do
      post 'upload', on: :member
    end
    resources :albums, :except => [:new, :edit]
    resources :photos, :except => [:new, :edit] do
      post 'upload', on: :collection
    end
  end

  match '/login' => 'home#login', :as => :login
  match '/logout' => 'home#logout', :as => :logout
  root :to => 'bands#show'
end
