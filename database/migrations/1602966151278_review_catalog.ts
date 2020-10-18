import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ReviewCatalogs extends BaseSchema {
  protected tableName = 'review_catalog'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('review_id').unsigned();
      table.foreign('review_id').references('id').inTable('reviews').onDelete('CASCADE');

      table.integer('catalog_id').unsigned();
      table.foreign('catalog_id').references('id').inTable('catalogs').onDelete('CASCADE');

      table.float('rating', 10, 1).notNullable();

      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
