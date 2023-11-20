class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :nickname, null: false
      t.string :img, null: false, default: "default_user.png"
      t.string :discriminator, null: false, default: "Client"

      t.timestamps
    end
    add_index :users, :nickname, unique: true
  end
end
