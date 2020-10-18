import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CatalogGenres extends BaseSchema {
  protected tableName = "catalog_genre";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("catalog_id").unsigned();
      table
        .foreign("catalog_id")
        .references("id")
        .inTable("catalogs")
        .onDelete("CASCADE");

      table.integer("genre_id").unsigned();
      table
        .foreign("genre_id")
        .references("id")
        .inTable("genres")
        .onDelete("CASCADE");

      table.timestamps(false);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
