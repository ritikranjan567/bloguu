Rails.application.routes.draw do
  root 'pages#index'
  get 'pages/index'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :destroy, :update]
      resources :posts, only: [:index, :show, :destroy, :update, :create]
      resources :sessions, only: [:create]
      resources :comments
    end
  end

  match '*path', to: 'pages#index', via: :all,  constraints: lambda {|req| req.path.exclude? 'rails/active_storage'}
end
