class Employee < User
  # self.inheritance_column = :discriminator

  attr_accessor :profession, :admin, :name, :surname, :dni
end
