Rails.application.routes.draw do
  get "/sessions/current_user", to: "api/v1/sessions/current_user#index"

  devise_for :users, path: "", path_names: { sign_in: "api/v1/login", sign_out: "api/v1/logout", registration: "api/v1/signup" }, controllers: { sessions: "api/v1/sessions/sessions", registrations: "api/v1/sessions/registrations" }

  namespace :api do
    namespace :v1 do
      namespace :users, path: "" do
        resources :users, only: [:index, :update]
        resources :clients
      end
      namespace :activities, path: "" do
        resources :activities
      end
    end
  end
end
