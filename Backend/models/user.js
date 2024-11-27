const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const User = sequelize.define('User',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false
        },
        dataNasc: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Cart, { foreignKey: 'userId', as: 'carts' });
    };
    
    return User;
};
