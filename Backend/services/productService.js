const product = require("../models/product");

class ProductService{
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    async create(name, description, price, quantity){
        try{
            const newProduct = await this.Product.create({
                name,
                description,
                price,
                quantity
            })
            return newProduct ? newProduct : null
        }
        catch(error){
            throw error;
        }
    }

    async findAll(){
        try{
            const allProducts = await this.Product.findAll();
            return allProducts ? allProducts : null
        }
        catch(error){
            throw error;
        }
    }

    async update(id, name, description, price, quantity){
        try {
            const updatedProducts = await this.Product.update(
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
            return updatedProducts ? updatedProducts : null;
        } catch (error) {
            throw error;
        }
    }

    async delete(id){
        try {
            const deletedCount = await this.Product.destroy({
                where: { id }
            });
            return deletedCount > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService
