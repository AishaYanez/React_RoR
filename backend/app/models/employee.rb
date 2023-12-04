class Employee < User
  has_many :activity

  attr_accessor :profession, :admin, :name, :surname, :dni
end
