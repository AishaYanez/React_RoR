class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_and_belongs_to_many :activities
  self.inheritance_column = :discriminator

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
end
