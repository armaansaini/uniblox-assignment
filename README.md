This is an Uniblox assignment. This is an ecommerce website where users can add items to their cart and checkout them. After every nth checkout, the user gets a promocode, which he can use to avail the discount.

Steps to run on the local machine.

1. Install dependencies with npm install
2. Add dev.sqlite3 file in the root of the directory
3. Run migrations with npm run db:migrate
4. Run seeds with npm run seed:run
5. Create and .env from .env.sample and populate it with the values

```bash
npm install

touch dev.sqlite3

npm run db:migrate

npm run seed:run
```

Then run the server on the local with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
