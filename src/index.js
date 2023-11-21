const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json());

const contasRoutes = require('./routes/rotas');
app.use('/', contasRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta} http://localhost:3000/`);
});