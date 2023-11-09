class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.string :name
      t.string :description
      t.integer :places

      t.timestamps
    end
  end
end
