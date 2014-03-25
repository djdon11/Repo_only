class Song
  include Mongoid::Document
  include Mongoid::Timestamps

  # - Associations - #
  belongs_to :album

  # - Validations - #
  validates_presence_of :album

  # - Fields - #
  field :track_no, type: Integer
  field :title
  field :lyrics

  field :download_type
  field :price, type: Float

  field :file
  field :amazon_store_link
  field :itunes_store_link

  field :slideshow_trans_time
  field :slideshow_trans_style
  field :video_embed_tag

  field :disabled, type: Boolean
  field :download_disabled, type: Boolean
  field :lyrics_disabled, type: Boolean
  field :fullscreen_disabled, type: Boolean

  delegate :band, to: :album

  # - CarrierWave - #
  mount_uploader :file, SongUploader
end
