export function up(knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("slug_name").unique().notNullable();
    table.text("description");
    table.text("image_url");
    table.integer("stock").notNullable().defaultTo(0);
    table.decimal("price", 10, 2).notNullable();
    table.string("category"); // should be enum, but used string for simplicity
    table.boolean("active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("product");
}
