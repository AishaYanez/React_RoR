class CreateClients < ActiveRecord::Migration[7.1]
  def change
    create_table :clients do |t|
      t.string :name, default: "default_user.png"
      t.string :surname
      t.string :dni
      t.date :birthdate
      t.integer :cardnumber

      t.timestamps
    end
  end
end
