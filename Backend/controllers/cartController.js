class CartController {
    constructor(CartService){
        this.cartService = CartService
    }

    async createCart(req, res){
        const { userId } = req.body;

        try {
            const newCart = await this.cartService.create(userId);
            res.status(200).json(newCart);
            res.send();
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao criar o carrinho."});
        }
    }

    async addProduct(req, res){
        const { userId, productId, quantity } = req.body;

        try {
            const addedProduct = await this.cartService.addProduct(userId, productId, quantity);
            res.status(200).json(addedProduct);
            res.send();
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao adicionar um produto ao carrinho."});
        }
    }

    async removeProduct(req, res){
        const { userId, productId } = req.query;
        
        try {
            const Removed = await this.cartService.removeProduct(userId, productId);
            res.status(200).json(Removed);
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao remover um produto ao carrinho."});
        }
    }

    async findProducts(req, res){
        const { cartId } = req.query;

        try {
            const products = await this.cartService.findAll(cartId);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar os produtos do carrinho."});
        }
    }
}

module.exports = CartController
