class CreateResorts < ActiveRecord::Migration
  def change
    create_table :resorts do |t|
      t.string :name
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
