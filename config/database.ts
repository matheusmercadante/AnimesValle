/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from "@ioc:Adonis/Core/Env";
import { OrmConfig } from "@ioc:Adonis/Lucid/Orm";
import { DatabaseConfig } from "@ioc:Adonis/Lucid/Database";
const Url = require("url-parse");

const CLEARDB_DATABASE_URL = new Url(Env.get("CLEARDB_DATABASE_URL"));
const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get("DB_CONNECTION", "mysql") as string,

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
    mysql: {
      client: "mysql",
      connection: {
        host: Env.get("DB_HOST", "mysql000.umbler.com") as string,
        port: Number(Env.get("DB_PORT", "")),
        user: Env.get("DB_USER", "user") as string,
        password: Env.get(
          "DB_PASSWORD",
          "senha"
        ) as string,
        database: Env.get(
          "DB_DATABASE",
          "db"
        ) as string,
      },
      healthCheck: false,
    },
  },

  /*
  |--------------------------------------------------------------------------
  | ORM Configuration
  |--------------------------------------------------------------------------
  |
  | Following are some of the configuration options to tweak the conventional
  | settings of the ORM. For example:
  |
  | - Define a custom function to compute the default table name for a given model.
  | - Or define a custom function to compute the primary key for a given model.
  |
  */
  orm: {},
};

export default databaseConfig;