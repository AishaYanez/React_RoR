class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  self.inheritance_column = :discriminator

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
end
