import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Seasons extends BaseSchema {
  protected tableName = "seasons";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("catalog_id").unsigned();
      table
        .foreign("catalog_id")
        .references("id")
        .inTable("catalogs")
        .onDelete("CASCADE");

      table.string("name", 100).notNullable();
      table.string("main_image").notNullable();
      table.string("type_image").notNullable();
      table.string("qtd_episodes", 30).notNullable();
      table.string("published", 1).notNullable();
      table.string("url", 100).notNullable();

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
