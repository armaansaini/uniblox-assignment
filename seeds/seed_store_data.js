export async function seed(knex) {
  await knex("store_data").del();
  await knex("store_data").insert([
    { id: 1, orders_to_unlock_discount: 5, discount_percentage: 10 },
  ]);
}
