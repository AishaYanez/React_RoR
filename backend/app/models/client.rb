# app/models/client.rb
class Client < User
  validates :name, presence: true
  validates :surname, presence: true
  validates :dni, presence: true
  validates :birthdate, presence: true
  validates :cardnumber, presence: true

  # Puedes agregar métodos y validaciones específicos de Client aquí
end
