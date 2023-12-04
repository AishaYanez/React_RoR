class ActivitySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :date, :image

  attribute :coordinator do |activity|
    EmployeeSerializer.new(activity.object.user).as_json
  end

  attribute :assistants do |activity|
    ActiveModel::SerializableResource.new(activity.object.users, each_serializer: EmployeeSerializer).as_json
  end

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image),
      }
    end
  end
end
