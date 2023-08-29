import { Database } from "./type/database.interface"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import config from "./config";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.postgres.database,
    host: config.postgres.host,
    user: config.postgres.user,
    port: config.postgres.port,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
