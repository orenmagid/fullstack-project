class Favorite < ApplicationRecord
  validates :url, presence: true
  validates :unsplash_id, presence: true, uniqueness: true
end
