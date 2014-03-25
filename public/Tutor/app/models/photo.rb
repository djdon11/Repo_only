class Photo
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :band
  validates :band, :presence => true

  field :file, type: String
  field :order, type: String

  mount_uploader :file, ImageUploader
end