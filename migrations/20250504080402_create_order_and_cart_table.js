export function up(knex) {
  return knex.schema
    .createTable("order", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable().references("id").inTable("user");
      table.dateTime("order_date").notNullable();
      table
        .enum("status", ["pending", "payment_captured", "shipped", "delivered"])
        .notNullable()
        .defaultTo("pending");
      table.float("total_amount").notNullable();
      table.float("discount_applied").notNullable().defaultTo(0);
      table.float("final_amount").notNullable();
      table.text("shipping_address").notNullable();
      table.string("payment_id").notNullable();
      table.enum("payment_partner", ["stripe", "razorpay", "wallet"]);
      table.timestamps(true, true);
    })
    .createTable("order_item", (table) => {
      table.increments("id").primary();
      table.integer("order_id").notNullable().references("id").inTable("order");
      table
        .integer("product_id")
        .notNullable()
        .references("id")
        .inTable("product");
      table.integer("quantity").notNullable();
      table.integer("price").notNullable();
      table.timestamps(true, true);
    })
    .createTable("cart", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable().references("id").inTable("user");
      table.enum("status", ["current", "checked_out"]);
      table.timestamps(true, true);
    })
    .createTable("cart_items", (table) => {
      table.increments("id").primary();
      table.integer("cart_id").notNullable().references("id").inTable("cart");
      table
        .integer("product_id")
        .notNullable()
        .references("id")
        .inTable("product");
      table.integer("quantity");
      table.boolean("active").notNullable().defaultTo(true);
      table.timestamps(true, true);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists("cart_items")
    .dropTableIfExists("cart")
    .dropTableIfExists("order_items")
    .dropTableIfExists("order");
}
