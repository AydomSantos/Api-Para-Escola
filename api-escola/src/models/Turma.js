const { Model, DataTypes } = require('sequelize');

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        i_id_turma: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        horario: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'turmas',
        timestamps: true, 
        underscored: true, 
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Aluno, {
      through: 'matriculas',
      foreignKey: 'i_id_turma',
      as: 'alunos',
    });
  }
}

module.exports = Turma;
