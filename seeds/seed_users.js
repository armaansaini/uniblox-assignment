export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      id: 1,
      name: "Armaan",
      email: "armaan@example.com",
      password: "armaan123",
      address: "India",
      phone: "1234567890",
      role: "admin",
    },
    {
      id: 2,
      name: "Saini",
      email: "saini@example.com",
      password: "saini123",
      address: "Japan",
      phone: "4585964512",
      role: "customer",
    },
    {
      id: 3,
      name: "Engineer",
      email: "engineer@example.com",
      password: "engineer123",
      address: "New York",
      phone: "7391468250",
      role: "customer",
    },
  ]);
}
