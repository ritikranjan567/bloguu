Rails.application.routes.draw do
  root 'pages#index'
  get 'pages/index'

  namespace :api do
    namespace :v1 do
      put "/update-user", to: "users#update"
      delete "/delete-profile", to: "users#destroy"
      put "/change-password", to: "users#change_password"
      resources :users, only: [:create, :show]
      resources :posts, only: [:index, :show, :destroy, :update, :create]
      resources :sessions, only: [:create]
      resources :comments
    end
  end

  match '*path', to: 'pages#index', via: :all,  constraints: lambda {|req| req.path.exclude? 'rails/active_storage'}
end
