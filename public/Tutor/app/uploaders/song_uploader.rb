# encoding: utf-8

class SongUploader < CarrierWave::Uploader::Base
  storage :fog

  def store_dir
    "uploads/bands/#{model.band.name.parameterize}/albums/#{model.album.title.parameterize}/songs"
  end

  def extension_white_list
    %w(mp3)
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
