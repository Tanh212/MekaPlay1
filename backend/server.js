// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

// Rules (optional, can be skipped at first)
const rules = auth.rewriter({
  users: 600,
  products: 644,
  categories: 644,
  brands: 644,
  orders: 660
});

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
