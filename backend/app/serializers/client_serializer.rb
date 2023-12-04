class ClientSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :email, :cardnumber, :birthdate
end
