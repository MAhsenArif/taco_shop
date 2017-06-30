class CreateTacos < ActiveRecord::Migration[5.0]
  def change
    create_table :tacos do |t|
      t.string :meat, limit: 30, null: false
      t.boolean :rice, default: false
      t.boolean :salsa, default: false
      t.text :notes

      t.timestamps
    end
  end
end
