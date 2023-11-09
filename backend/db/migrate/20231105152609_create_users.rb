class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :nickname, index: { unique: true }
      t.string :email, index: { unique: true }
      t.string :password
      t.string :img
      t.string :discriminator

      t.timestamps
    end
  end
end
