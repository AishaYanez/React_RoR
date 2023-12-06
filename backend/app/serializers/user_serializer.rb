class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :nickname, :email, :img, :discriminator, :admin

  attribute :setting do |user|
    puts
    SettingSerializer.new(user.setting).as_json
  end

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime("%m/%d/%Y")
  end
end
