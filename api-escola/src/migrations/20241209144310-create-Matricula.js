'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matriculas', {
      i_id_matricula: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      i_id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alunos', 
          key: 'i_id_alunos'  // Correção para 'i_id_alunos'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      i_id_turma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'turmas', // Nome da tabela de referência
          key: 'i_id_turma' // Chave primária da tabela de referência
        },
        onUpdate: 'CASCADE', // Atualiza a matrícula se a turma for atualizada
        onDelete: 'CASCADE' // Deleta a matrícula se a turma for deletada
      },
      d_data_matricula: {
        type: Sequelize.DATE,
        allowNull: false
      },
      d_data_transacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      s_status_matricula: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matriculas');
  }
};
