const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartProduct = sequelize.define('CartProduct', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        value: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        cartId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Carts",
                key: "id"
            },
            onDelete: 'CASCADE'
        },
        productId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Products",
                key: "id"
            },
            onDelete: 'CASCADE'
        }
    });

    CartProduct.associate = function(models) {
        CartProduct.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'carts' });
        CartProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'products' });
    };

    return CartProduct;
};
