require('dotenv').config();
const express = require('express');
const error = require('./middlewares/error');

const productsRoutes = require('./Routes/products.routes');
const salesProuducts = require('./Routes/sales.routes');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.use('/sales', salesProuducts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
