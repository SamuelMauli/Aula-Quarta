const cart = require("../models/cart");
const product = require("../models/product");
const user = require("../models/user");
const cartProduct = require("../models/cartProduct");
const { Op } = require('sequelize');
const db = require('../models')

const Product = db.Product;

class CartService{
    constructor(CartModel, CartProductModel){
        this.Cart = CartModel;
        this.CartProduct = CartProductModel;
    }

    async create(userId){
        try{
            const newCart = await this.Cart.create({
                userId
            })
            return newCart ? newCart : null
        }
        catch(error){
            throw error;
        }
    }

    async addProduct(userId, productId, quantity){
        try {
            const cart = await this.Cart.findOne({
                where: { userId }
            });
            const product = await Product.findOne({
                where: { id: productId }
            })
            const addedItem = await this.CartProduct.create({
                cartId: cart.id,
                productId,
                quantity,
                value: product.price
            })

            return addedItem ? addedItem : null;
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(userId, productId){
        try {
            const cart = await this.Cart.findOne({
                where: { userId }
            });
            const deletedCount = await this.CartProduct.destroy({
                where: {
                    [Op.and]: [
                        { cartId: cart.id },
                        { productId }
                    ]
                }
            });
            return deletedCount > 0;
        } catch (error) {
            throw error;
        }
    }

    async findAll(cartId){
        try{
            const cartProducts = await this.CartProduct.findAll({
                where: { cartId }
            });
            return cartProducts ? cartProducts : null
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = CartService
