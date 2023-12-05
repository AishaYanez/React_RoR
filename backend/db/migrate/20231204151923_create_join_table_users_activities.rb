class CreateJoinTableUsersActivities < ActiveRecord::Migration[7.1]
  def change
    create_join_table :users, :activities do |t|
      t.index [:activity_id, :user_id]
    end
  end
end
