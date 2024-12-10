// Adicionando a biblioteca Express
const express = require('express');

// ================================

// Importando as Rotas da Aplicação
const routes = require('./routes/index.js'); 

// =================================================

// Importando o database da aplicação
const sequelize = require('./database/index.js');

// =================================================

const app = express();

app.use(express.json());
app.use(routes);

sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app; // Exportando com CommonJS
