const db = require('../models')
const auth = require('../auth')
const bcrypt = require('bcrypt');
var roundSalts = 10;

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async create(email, dataNasc, password){
        try{
            const hashPassword = await bcrypt.hash(password, parseInt(roundSalts));
            const newUser = await this.User.create({
                email,
                dataNasc,
                password: hashPassword
            })
            return newUser ? newUser : null
        }
        catch(error){
            throw error;
        }
    }

    async findAll(){
        try{
            const allUsers = await this.User.findAll();
            return allUsers ? allUsers : null
        }
        catch(error){
            throw error;
        }
    }

    async findById(id){
        try {
            const User = await this.User.findByPk(id);
            return User ? User : null;
        } catch (error) {
            throw error;
        }
    }

    async login(email, password){
        try {
            const User = await this.User.findOne({
                where: { email }
            });
            if(User){
                if(await bcrypt.compare(password, User.password)){
                    const token = await auth.generateToken(User);
                    User.dataValues.token = token;
                    User.dataValues.password = "";
                }
                else{
                    throw new Error('Senha inválida');
                }
            }
            return User ? User : null
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService
