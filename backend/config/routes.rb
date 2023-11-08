Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do 
      # get "users" => "users#index"
      # get "users/user" => "users#show"
      # put "users/user" => "users#show"
      # delete "users/user" => "users#show"
      resources :users
    end
  end

end
