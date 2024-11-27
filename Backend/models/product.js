const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
    const Product = sequelize.define('Product',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type: Sequelize.STRING,
            allowNull:false
        },
        description:{
            type: Sequelize.STRING,
            allowNull:false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Product;
};