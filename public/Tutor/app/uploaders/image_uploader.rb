# encoding: utf-8
class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog
  
  version :thumb do
    process :resize_to_fill => [89,89]
  end
  
  def store_dir
    "uploads/bands/#{model.band.name.parameterize}/photos/"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
     @name ||= "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
  
end