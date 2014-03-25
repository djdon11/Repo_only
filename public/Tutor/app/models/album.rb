class Album
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :band
  has_many :songs, order: [:track_no, :asc]

  validates :band, :presence => true

  field :title
  field :album_cover_url
  field :record_label
  field :release_year, type: Integer
  field :download_type
  field :price, type: Float
  field :amazon_store_link
  field :itunes_store_link

  field :title_disabled, type: Boolean
  field :cover_disabled, type: Boolean
  field :download_disabled, type: Boolean
  field :share_disabled, type: Boolean
  field :num_song_plays_disabled, type: Boolean
  field :parental_advisory_disabled, type: Boolean
  field :release_date_disabled, type: Boolean
  field :record_label_disabled, type: Boolean


  # def as_json(options = {})
  #   options.merge
  # end
end
