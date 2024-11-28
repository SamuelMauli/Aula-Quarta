const product = require("../models/product");

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Criar um novo produto
    async create(name, description, price, quantity) {
        try {
            const newProduct = await this.Product.create({
                name,
                description,
                price,
                quantity
            });
            return newProduct ? newProduct : null;
        } catch (error) {
            throw new Error('Erro ao criar o produto: ' + error.message);
        }
    }

    // Buscar todos os produtos
    async findAll() {
        try {
            const allProducts = await this.Product.findAll();
            return allProducts && allProducts.length > 0 ? allProducts : [];
        } catch (error) {
            throw new Error('Erro ao buscar produtos: ' + error.message);
        }
    }

    // Atualizar um produto existente
    async update(id, name, description, price, quantity) {
        try {
            const [updatedCount] = await this.Product.update(
                {
                    name,
                    description,
                    price,
                    quantity
                },
                {
                    where: {
                        id
                    }
                }
            );
            return updatedCount > 0 ? { id, name, description, price, quantity } : null;
        } catch (error) {
            throw new Error('Erro ao atualizar o produto: ' + error.message);
        }
    }

    // Deletar um produto
    async delete(id) {
        try {
            const deletedCount = await this.Product.destroy({
                where: { id }
            });
            return deletedCount > 0;
        } catch (error) {
            throw new Error('Erro ao excluir o produto: ' + error.message);
        }
    }
}

module.exports = ProductService;
