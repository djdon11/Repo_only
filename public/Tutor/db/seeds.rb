["Opera","Pop","Pop Latino","R&B/Soul","Raices","Reggaeton","Rock","Salsa Y Tropic","Singer/Songwr","Soundtrack","Spoken Word","Vocal","World","World East","World South","World West"].each do |genre_name|
  FactoryGirl.create(:genre, :name => genre_name)        
end

["Arena","Blues-Rock","British Invasion","Death/Black M","Glam Rock","Hair Metal","Heavy Metal","Prog-Rock/Art","Psychadelic","Rock &amp; Roll","Rockabilly","Roots Rock","Singer/Songw","Southern Rock","Surf","Zombie"].each do |sub_genre_name|
  FactoryGirl.create(:sub_genre, :name => sub_genre_name)
end

["MailChimp","Constant Contact"].each do |email_provider|
  FactoryGirl.create(:email_provider, :name => email_provider)
end

["Blogger","Tumblr"].each do |blog_name|
  FactoryGirl.create(:blog_platform, :name => blog_name)
end

[
  {:name => "silver", :price => 8, :album_count => 1, :song_count => 15},
  {:name => "gold", :price => 14, :album_count => 3, :song_count => 15},
  {:name => "platinum", :price => 24, :album_count => -1, :song_count => -1}
].each do |plan|
  FactoryGirl.create(:plan, plan)
end


user = FactoryGirl.create(:user,
  :plan => Plan.first)

FactoryGirl.create(:credit_card, :user => user)

band = FactoryGirl.create(:band, 
  :user => user,
  :genre => Genre.first,
  :sub_genre => SubGenre.first,
  :blog_platform => BlogPlatform.first,
  :email_provider => EmailProvider.first)

FactoryGirl.create(:logo, band: band)

6.times do 
  FactoryGirl.create(:live_show, band: band)
end

3.times do
  album = FactoryGirl.create(:album, band: band)
  10.times { FactoryGirl.create(:song, album: album) }
end