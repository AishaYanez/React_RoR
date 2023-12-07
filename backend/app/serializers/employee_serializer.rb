class EmployeeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :nickname, :email, :admin, :profession, :image

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image),
      }
    end
  end
end
