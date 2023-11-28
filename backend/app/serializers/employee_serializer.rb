class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :email, :admin, :profession
end
