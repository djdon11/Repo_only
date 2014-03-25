class Band
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :user
  belongs_to :genre
  belongs_to :sub_genre
  belongs_to :email_provider
  belongs_to :blog_platform

  has_one :logo
  
  has_many :videos  
  has_many :photos  
  has_many :albums
  has_many :live_shows

  field :name
  field :spindle_url
  field :city
  field :state
  field :country
  field :logo
  field :bio
  field :fb_url
  field :twitter_url
  field :store_url
  field :paypal_email
  field :paypal_currency
  field :twitter_handle
  field :fb_handle
  field :blog_url
  field :email_api_key

  field :play_button_disabled, type: Boolean
  field :logo_disabled, type: Boolean
  field :live_shows_disabled, type: Boolean

  field :fb_disabled, type: Boolean
  field :twitter_disabled, type: Boolean
  field :store_disabled, type: Boolean
  field :bio_disabled, type: Boolean
  field :news_disabled, type: Boolean
  field :live_shows_disabled, type: Boolean
  
  #News Lights
  field :news_fb_disabled, type: Boolean
  field :news_twitter_disabled, type: Boolean
  field :news_blog_disabled, type: Boolean
  field :news_email_disabled, type: Boolean

  #Gallery Settings
  field :g_photos_disabled, type: Boolean
  field :g_videos_disabled, type: Boolean
  # TODO: Rename to make specific to photos
  field :g_transition_time, type: Float
  field :g_transition_style, type: String

  #Account
  field :custom_domain, type: String

  def as_json(options = {})
    return super(options) unless options.delete(:api)
    super(:include => {
        :albums => {
            :include => :songs },
        :live_shows => {},
        :genre => {:only => [:_id, :name] },
        :sub_genre => {},
        :blog_platform => {:only => [:_id, :name] },
        :email_provider => {},
        :logo => {},
        :videos => {},
        :photos => {}
    })


  end
end
