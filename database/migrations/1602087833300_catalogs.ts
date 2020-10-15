import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Catalogs extends BaseSchema {
  protected tableName = "catalogs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.text("name", 'mediumText').notNullable();
      table.text("description", 'mediumText').notNullable();
      table.string("release_year", 4).notNullable();
      table.string("quality", 2).notNullable();
      table.string("author", 40).notNullable();
      table.string("country", 20).notNullable();
      table.string("main_image").notNullable();
      table.string("type_image", 3).notNullable();
      table.string("published", 1).notNullable();
      table.string("qtd_seasons").notNullable();
      table.float("rating", 10, 2).nullable();
      table.string("trailer_link", 200).nullable();

      table.text("url", 'mediumText').notNullable();
      table.string("meta_title", 100).notNullable();

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
