import { Knex } from "knex";
import { DATA_SOURCES } from "../config/db.config";

export default {
  client: process.env.DB_CLIENT || 'mysql2',
  connection: DATA_SOURCES.sqlDataSource,
  migrations: {
    directory: "./migrations",
  },
} as Knex.Config;