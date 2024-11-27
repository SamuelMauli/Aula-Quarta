class ProductController {
    constructor(ProductService){
        this.productService = ProductService
    }

    async createProduct(req, res){
        const { name, description, price, quantity } = req.body;

        try {
            const newProduct = await this.productService.create(name, description, price, quantity);
            res.status(200).json(newProduct);
            res.send();
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao criar o produto."});
        }
    }

    async findAllProducts(req, res){
        try{
            const allProducts = await this.productService.findAll();
            res.status(200).json(allProducts);
        }
        catch(error){
            res.status(500)
                .json({ error: "Ocorreu um erro ao localizar todos os produtos." });
        }
    }

    async updateProductById(req, res){
        const { id } = req.query;
        const { name, description, price, quantity } = req.body;
        try {
            const Product = await this.productService.update(id, name, description, price, quantity);
            res.status(200).json(Product);
        } catch (error) {
            res.status(500)
                .json({ error: "Ocorreu um erro ao atualizar o produto." })
        }
    }

    async deleteById(req, res){
        const { id } = req.query;
        try {
            const Product = await this.productService.delete(id);
            res.status(200).json(Product);
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar o produto." });
        }
    }
}

module.exports = ProductController
