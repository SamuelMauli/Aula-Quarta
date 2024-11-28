'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna typeUser à tabela Users
    await queryInterface.addColumn('Users', 'typeUser', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'typeUser', // Nome da tabela referenciada
        key: 'id'          // Nome da coluna na tabela referenciada
      },
      onUpdate: 'CASCADE', // Atualizações na chave estrangeira se propagam
      onDelete: 'SET NULL' // Remove o vínculo se o registro for excluído
    });
  },

  async down(queryInterface) {
    // Remove a coluna typeUser da tabela Users
    await queryInterface.removeColumn('Users', 'typeUser');
  }
};
