class Activity < ApplicationRecord
  has_one_attached :image
  belongs_to :user

  validates :name, presence: true
  validates :description, presence: true
  validates :date, presence: true
  validates :places, presence: true
  validates :image, presence: false
end
