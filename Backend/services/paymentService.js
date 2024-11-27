const db = require('../models')
const CartService = require("../services/cartService")
const cartService = new CartService(db.Cart, db.CartProduct);

class PaymentService{
    constructor(PaymentModel){
        this.payment = PaymentModel;
    }

    async payPix(userId){
        try{
            const cart = await db.Cart.findOne({
                where: { userId }
            });

            const products = await cartService.findAll(cart.id);
            let value = 0;
            products.map(product => {
                value += product.value * product.quantity;
            })

            const payment = await this.payment.create({
                userId,
                totalValue: value,
                method: "PIX",
                status: "Pendente"
            })

            return payment ? payment : null
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async payCreditCard(userId){
        try{
            const cart = await db.Cart.findOne({
                where: { userId }
            });

            const products = await cartService.findAll(cart.id);
            let value = 0;
            products.map(product => {
                value += product.value * product.quantity;
            })

            const payment = await this.payment.create({
                userId,
                totalValue: value,
                method: "Cartão de crédito",
                status: "Pendente"
            })

            return payment ? payment : null
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async paymentStatus(transactionId){
        try {
            const payment = await this.payment.findByPk(transactionId);
            return payment ? payment : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService
