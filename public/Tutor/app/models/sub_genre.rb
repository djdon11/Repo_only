class SubGenre
  include Mongoid::Document

  has_many :bands
  
  field :name, type: String

end