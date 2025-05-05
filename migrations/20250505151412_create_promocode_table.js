export function up(knex) {
  return knex.schema
    .createTable("promocode", (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();
      table.integer("discount_percentage").notNullable().defaultTo(0);
      table.integer("user_id").notNullable().references("id").inTable("user");
      table.integer("order_id").references("id").inTable("order");
      table.boolean("active").notNullable().defaultTo(true);
      table.timestamps(true, true);
    })
    .alterTable("order", (table) => {
      table.integer("promocode_id").references("id").inTable("promocode");
    });
}

export function down(knex) {
  return knex.schema
    .alterTable("order", (table) => {
      table.dropColumn("promocode_id");
    })
    .dropTableIfExists("promocode");
}
