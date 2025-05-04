import knex, { Knex } from "knex";

const db: Knex = knex({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
  useNullAsDefault: true,
});

export default db;
