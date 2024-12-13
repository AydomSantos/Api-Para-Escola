const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const AlunoModel = require('../models/Aluno.js');
const TurmaModel = require('../models/Turma.js');
const MatriculaModel = require('../models/Matricula.js');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração de conexão com o banco de dados (local ou remoto)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,  // Define default port (3306) if not provided
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Definir os modelos
const models = [AlunoModel, TurmaModel, MatriculaModel];

// Inicializando os modelos
models.forEach(model => model.init(sequelize));

// Associando os modelos (garantindo que as associações sejam feitas após a inicialização)
models.forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

// Sincronizando o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

module.exports = sequelize;
