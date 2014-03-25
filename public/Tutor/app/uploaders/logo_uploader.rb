# encoding: utf-8
class LogoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog
  
  process :resize_to_fit => [185, nil]
  #process :make_transparent => "#ffff"

  #to make the given color transparent in to the image
  def make_transparent(bgcolor)
    manipulate! do |img|
      img.format("png") do |c|
        c.transparent bgcolor
      end
      img
    end
  end
  
  def store_dir
    "uploads/bands/#{model.band.name.parameterize}/logos/"
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