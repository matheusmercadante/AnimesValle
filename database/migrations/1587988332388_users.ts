import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 100)
      table.string('username', 120).unique().notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.boolean('isAdmin').defaultTo(false);
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
