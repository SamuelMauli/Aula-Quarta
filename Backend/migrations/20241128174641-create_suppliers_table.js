module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Suppliers', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false
          },
          email: {
              type: Sequelize.STRING,
              unique: true,
              allowNull: false
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false
          },
          dataNasc: {
              type: Sequelize.DATE,
              allowNull: true
          },
          cnpj: {
              type: Sequelize.STRING,
              unique: true,
              allowNull: false
          },
          nomeFornecedor: {
              type: Sequelize.STRING,
              allowNull: false
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
          }
      });
  },

  down: async (queryInterface) => {
      await queryInterface.dropTable('Suppliers');
  }
};
