class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :description
      t.string :alt_description
      t.string :url
      t.string :unsplash_id

      t.timestamps
    end
  end
end
