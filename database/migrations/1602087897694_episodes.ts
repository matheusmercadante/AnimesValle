import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Episodes extends BaseSchema {
  protected tableName = "episodes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("season_id").unsigned();
      table
        .foreign("season_id")
        .references("id")
        .inTable("seasons")
        .onDelete("CASCADE");

      table.string("name", 100).notNullable();
      table.string("description", 100).notNullable();
      table.string("episode_video").notNullable();
      table.string("type_video", 3).notNullable();
      table.string("ep_url", 100).notNullable();
      table.string("meta_title", 100).notNullable();

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
