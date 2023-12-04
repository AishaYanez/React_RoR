class Activity < ApplicationRecord
  has_one_attached :image
  belongs_to :user
  has_and_belongs_to_many :users

  validates :name, presence: true
  validates :description, presence: true
  validates :date, presence: true
  validates :places, presence: true
  validates :user_id, presence: true
  validates :image, presence: false
end
