class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  self.inheritance_column = :discriminator

  # def self.create_with_subclass(attributes)
  #   discriminator = attributes.delete("discriminator")
  #   subclass = subclass_for_discriminator(discriminator)

  #   # Crea la instancia de la subclase con todos los atributos
  #   instance = subclass.new(attributes)

  #   # Intenta guardar la instancia y devuelve el resultado
  #   if instance.save
  #     instance
  #   else
  #     instance.errors.full_messages
  #   end
  # end

  # private

  # def self.subclass_for_discriminator(discriminator)
  #   puts "Nuevo usuario------------------//////////// #{discriminator}"
  #   case discriminator
  #   when "Client"
  #     Client
  #   when "Employee"
  #     Employee
  #   else
  #     raise "Unknown discriminator: #{discriminator}"
  #   end
  # end

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
end
