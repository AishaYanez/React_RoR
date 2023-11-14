class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.integer :places, null: false
      t.integer :img, null: false, default: "default_place.png"

      t.timestamps
    end
  end
end
