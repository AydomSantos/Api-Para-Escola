'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alunos', {
      i_id_alunos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      s_name_alunos: {
        type: Sequelize.STRING(100),
        allowNull: false
      }, 
      s_sobrenome_alunos: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      s_email_alunos: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      i_idade_alunos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      f_peso_alunos: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      f_altura_alunos: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('alunos');
  }
};
