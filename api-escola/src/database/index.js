const Sequelize = require('sequelize');
const AlunoModel = require('../models/Aluno.js');
const TurmaModel = require('../models/Turma.js');
const MatriculaModel = require('../models/Matricula.js');

// Inicializando a conexão com o banco de dados MySQL
const sequelize = new Sequelize('api_para_escola', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

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