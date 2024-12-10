const { Model, DataTypes } = require('sequelize');

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        i_id_aluno: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        sobrenome: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        idade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        peso: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        altura: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'alunos',
        timestamps: true, // Adicionando timestamps
        underscored: true, // Usando notação snake_case
      }
    );
    return this;
  }

  static associate(models) {
    // Relacionamento Many-to-Many entre Aluno e Turma
    this.belongsToMany(models.Turma, {
      through: 'matriculas', 
      foreignKey: 'i_id_aluno', 
      as: 'turmas',
    });
  }
}

module.exports = Aluno;
