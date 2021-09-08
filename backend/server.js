const express = require('express');
const products = require('./data/products');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running at port 5000');
});

//Just for frontend tests (for components that fetches data).
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const PORT = 5000;
app.listen(PORT, console.log(`Server is up and running at port ${PORT}`));
