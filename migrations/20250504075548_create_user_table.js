export function up(knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("address");
    table.string("phone");
    table
      .enum("role", ["customer", "admin"])
      .notNullable()
      .defaultTo("customer");
    table.boolean("active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("user");
}
