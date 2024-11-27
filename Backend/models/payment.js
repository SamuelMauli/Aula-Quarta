const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
    const Payment = sequelize.define('Payment',{
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
        },
        totalValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        method:{
            type: Sequelize.STRING,
            allowNull:false
        },
        status:{
            type: Sequelize.STRING,
            allowNull:false
        }
    });

    Payment.associate = function(models) {
        Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    };

    return Payment;
};