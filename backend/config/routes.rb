Rails.application.routes.draw do
  get 'current_user/index'
  get "/users/current_user", to: "api/v1/users/current_user#index"

  devise_for :users, path: "", path_names: { sign_in: "api/v1/login", sign_out: "api/v1/logout", registration: "api/v1/signup" }, controllers: { sessions: "api/v1/users/sessions", registrations: "api/v1/users/registrations" }

  namespace :api do
    namespace :v1 do
      resources :users, controller: "users/users", as: "users", path: "users", only: [:index, :show, :create, :update, :destroy]
      resources :activities
      resources :locations
    end
  end
end
