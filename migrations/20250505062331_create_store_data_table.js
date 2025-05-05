export function up(knex) {
  return knex.schema.createTable("store_data", (table) => {
    table.increments("id").primary();
    table.integer("orders_to_unlock_discount");
    table.integer("discount_percentage");
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("store_data");
}
