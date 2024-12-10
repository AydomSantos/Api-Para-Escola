const { Model, DataTypes } = require('sequelize');

class Matricula extends Model {
  static init(sequelize) {
    super.init(
      {
        i_id_matricula: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        i_id_aluno: {
          type: DataTypes.INTEGER,
          references: {
            model: 'alunos',
            key: 'i_id_aluno',
          },
          allowNull: false,
        },
        i_id_turma: {
          type: DataTypes.INTEGER,
          references: {
            model: 'turmas',
            key: 'i_id_turma',
          },
          allowNull: false,
        },
        d_data_matricula: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        d_data_cancelamento: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        d_data_transacao: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        s_status_matricula: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        s_motivo_cancelamento: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        s_observacoes: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'matriculas',
        timestamps: true,
        underscored: true, // Usando notação snake_case
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, {
      foreignKey: 'i_id_aluno',
      as: 'alunos',
    });

    this.belongsTo(models.Turma, {
      foreignKey: 'i_id_turma',
      as: 'turmas',
    });
  }
}

module.exports = Matricula;
