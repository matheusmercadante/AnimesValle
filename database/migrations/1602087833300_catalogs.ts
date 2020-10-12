import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Catalogs extends BaseSchema {
  protected tableName = "catalogs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.text("name", 'mediumtext').notNullable();
      table.text("description", 'mediumtext').notNullable();
      table.string("release_year", 4).notNullable();
      table.string("quality", 2).notNullable();
      table.string("author", 40).notNullable();
      table.string("country", 20).notNullable();
      table.string("main_image").notNullable();
      table.string("type_image", 3).notNullable();
      table.string("published", 1).notNullable();
      table.string("qtd_seasons").notNullable();

      table.text("url", 'mediumtext').notNullable();
      table.string("meta_title", 100).notNullable();

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
