const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {
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
        cnpj: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        nomeFornecedor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        typeUser:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    });

    Supplier.associate = function(models) {
        Supplier.hasMany(models.Product, { foreignKey: 'supplierId', as: 'products' });
    };

    return Supplier;
};
