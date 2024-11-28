const db = require('../models');
const ProductService = require("../services/productService");
const CartService = require("../services/cartService");
const cartService = new CartService(db.Cart, db.CartProduct);
const supplierService = require("../services/supplierService");

class SupplierController {
    constructor() {
        this.supplierService = new supplierService(db.Supplier);  // Correção do nome do modelo
    }

    // Criar um novo fornecedor
    async createSupplier(req, res) {
        const { email, password, cnpj, nomeFornecedor, dataNasc } = req.body;

        try {
            // Criar fornecedor
            const newSupplier = await this.supplierService.create(email, password, nomeFornecedor,cnpj, dataNasc);
            
            if (!newSupplier) {
                return res.status(400).json({ error: "Erro ao criar fornecedor" });
            }

            // Criar o carrinho para o fornecedor
            const newCart = await cartService.create(newSupplier.id);

            return res.status(201).json(newSupplier);  
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao criar o fornecedor" });
        }
    }

    // Listar todos os fornecedores
    async findAllSuppliers(req, res) {
        try {
            const allSuppliers = await this.supplierService.findAll();
            return res.status(200).json(allSuppliers);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao localizar todos os fornecedores." });
        }
    }

    // Buscar um fornecedor pelo ID
    async findSupplierById(req, res) {
        const { id } = req.params;

        try {
            const supplier = await this.supplierService.findById(id);
            if (!supplier) {
                return res.status(404).json({ error: "Fornecedor não encontrado" });
            }
            return res.status(200).json(supplier);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Ocorreu um erro ao localizar o fornecedor pelo ID." });
        }
    }

    // Login do fornecedor
    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            // Primeiro tentamos o login do fornecedor
            const supplier = await this.supplierService.login(email, password);
    
            if (supplier) {
                // Fornecedor encontrado
                return res.status(200).json({
                    message: "Login bem-sucedido",
                    token: supplier.dataValues.token,
                    userType: supplier.typeUser,
                    redirectTo: "/products"  // Fornecedor vai para a página de produtos
                });
            }
    
            // Caso o login de fornecedor falhe, tentamos o login de um usuário comum
            const normalUser = await this.userService.login(email, password);  // Supondo que tenha um serviço para usuários normais
    
            if (normalUser) {
                return res.status(200).json({
                    message: "Login bem-sucedido",
                    token: normalUser.dataValues.token,
                    userType: normalUser.typeUser,
                    redirectTo: "/home"  // Usuário comum vai para a página principal
                });
            }
    
            return res.status(401).json({ error: "Credenciais inválidas" });  // Se nenhum login for bem-sucedido
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao tentar fazer login." });
        }
    }
    


    // Listar todos os produtos (acessível apenas para fornecedores)
    async findAllProducts(req, res) {
        try {
            const productService = new ProductService(db.Product);
            const allProducts = await productService.findAll();
            return res.status(200).json(allProducts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao listar todos os produtos." });
        }
    }

    // Criar um novo produto (somente para fornecedores)
    async createProduct(req, res) {
        const { name, description, price, stock } = req.body;
        
        try {
            // Verifique se o usuário é um fornecedor autenticado
            const { typeUser } = req.user;  // O `req.user` vem do middleware de autenticação

            if (typeUser !== 2) {  // `2` é o valor do tipo de usuário para fornecedores
                return res.status(403).json({ error: "Apenas fornecedores podem adicionar produtos." });
            }

            const productService = new ProductService(db.Product);
            const newProduct = await productService.create(name, description, price, stock);

            return res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao criar o produto." });
        }
    }

    // Atualizar um fornecedor existente
    async update(req, res) {
        const { id } = req.params;  // Recebe o id do fornecedor via parâmetros na URL
        const { email, password, cnpj, nomeFornecedor, dataNasc } = req.body;
    
        try {
            const updatedSupplier = await this.supplierService.update(id, email, password, cnpj, nomeFornecedor, dataNasc);
            return res.status(200).json(updatedSupplier);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar o fornecedor." });
        }
    }
}

module.exports = SupplierController;
