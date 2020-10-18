import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reviews extends BaseSchema {
  protected tableName = 'reviews'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

      table.string('title', 100).notNullable();
      table.text('description', 'mediumText').notNullable();

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
