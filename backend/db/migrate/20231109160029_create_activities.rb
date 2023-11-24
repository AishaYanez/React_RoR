class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :image, null: false, default: "default_place.png"
      t.date :date, null: false
      t.integer :places, null: false

      t.timestamps
    end
  end
end
