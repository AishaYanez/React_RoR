class AddEmployeeToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users do |t|
      t.boolean :admin, default: false
      t.string :profession
    end
  end
end
