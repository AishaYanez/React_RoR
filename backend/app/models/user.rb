class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  self.inheritance_column = :discriminator

  def self.create_with_subclass(attributes)
    subclass = subclass_for_discriminator(attributes["discriminator"])
    subclass.create(attributes.except(:discriminator))
  end

  private

  def self.subclass_for_discriminator(discriminator)
    puts "Nuevo usuario------------------//////////// #{discriminator}"
    case discriminator
    when "Client"
      Client
    when "Employee"
      Employee
    else
      raise "Unknown discriminator: #{discriminator}"
    end
  end

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
end
