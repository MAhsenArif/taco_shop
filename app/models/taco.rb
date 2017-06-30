class Taco < ApplicationRecord
  validates :meat, presence: true, length: {maximum: 30}

  scope :ordered, -> { order(created_at: :asc) }
end
