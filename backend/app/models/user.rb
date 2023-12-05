class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_and_belongs_to_many :activitiesAssisted, join_table: :employees_activitiesAssisted, class_name: "Activity"
  has_and_belongs_to_many :activitiesRegistered, join_table: :clients_activitiesRegistered, class_name: "Activity"
  self.inheritance_column = :discriminator

  has_one :setting, dependent: :destroy

  after_create :add_setting

  self.inheritance_column = :discriminator

  private

  def add_setting
    setting = Setting.new(font_size: "normal", light_mode: true, user_id: self.id)
    setting.save
  end

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
end
