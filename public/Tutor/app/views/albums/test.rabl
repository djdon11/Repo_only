collection @albums

attributes :id, :title, :album_cover_url, :release_year

child(:songs) {
  attributes :id, :track_no, :title, :lyrics, :price, :amazon_store_link, :itunes_store_link
}