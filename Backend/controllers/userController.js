const db = require('../models');
const CartService = require("../services/cartService");
const cartService = new CartService(db.Cart, db.CartProduct);

class UserController {
    constructor(UserService){
        this.userService = UserService
    }

    async createUser(req, res){
        const { email, password, dataNasc } = req.body;

        try {
            const newUser = await this.userService.create(email, dataNasc, password);
            const newCart = await cartService.create(newUser.id);
            res.status(200).json(newUser);
            res.send();
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao criar o usuário"});
        }
    }

    async findAllUsers(req, res){
        try{
            const allUsers = await this.userService.findAll();
            res.status(200).json(allUsers);
        }
        catch(error){
            res.status(500)
                .json({ error: "Ocorreu um erro ao localizar todos os usuários." });
        }
    }

    async findUserById(req, res){
        const { id } = req.query;
        try {
            const User = await this.userService.findById(id);
            res.status(200).json(User);
        } catch (error) {
            res.status(500)
                .json({ error: "Ocorreu um erro ao localizar os usuário pelo ID." })
        }
    }

    async login(req, res){
        const { email, password } = req.body;
        try {
            const User = await this.userService.login(email, password);
            res.status(200).json(User);
        } catch (error) {
            res.status(500).json({ error: "Erro ao logar o usuario." });
        }
    }
}

module.exports = UserController
