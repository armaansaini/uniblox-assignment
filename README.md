This is an Uniblox assignment. This is an ecommerce website where users can add items to their cart and checkout them. After every nth checkout, the user gets a promocode, which he can use to avail the discount.

Steps to run on the local machine.

1. Add dev.sqlite3 file in the root of the directory
2. Run migrations with npm run db:migrate
3. Run seeds with npm run seed:run
4. Create and .env from .env.sample and populate it with the values

```bash
touch dev.sqlite3

npm run db:migrate

npm run seed:run
```

Then run the server on the local with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
