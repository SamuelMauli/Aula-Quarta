const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');  // Usado para criptografar a senha

module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {  // Alterado para PascalCase
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,

        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cnpj: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,

        },
        nomeFornecedor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        typeUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2  // Valor padrão para fornecedor
        }
    });

    // Criptografar a senha antes de salvar no banco
    Supplier.beforeCreate(async (supplier, options) => {
        if (supplier.password) {
            const hashedPassword = await bcrypt.hash(supplier.password, 10);
            supplier.password = hashedPassword;
        }
    });

    // Método para verificar a senha durante o login
    Supplier.prototype.verifyPassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    // Associações
    Supplier.associate = function(models) {
        Supplier.hasMany(models.Product, { foreignKey: 'supplierId', as: 'products' });
    };

    return Supplier;
};
