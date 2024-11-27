const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
    const Cart = sequelize.define('Cart',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: 'CASCADE'
        }
    });

    Cart.associate = function(models) {
        Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    };

    return Cart;
};