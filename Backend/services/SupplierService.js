const db = require('../models')
const auth = require('../auth')
const bcrypt = require('bcrypt');
var roundSalts = 10;

class SupplierService {
    constructor(SupplierModel) {
        this.Supplier = SupplierModel;
    }

    // Método para criar um novo fornecedor
    async create(email, password, cnpj, nomeFornecedor, dataNasc) {
        try {
            // Criptografando a senha
            const hashPassword = await bcrypt.hash(password, parseInt(roundSalts));

            // Criando o novo fornecedor
            const newSupplier = await this.Supplier.create({
                email,
                password: hashPassword,
                cnpj,
                nomeFornecedor,
                dataNasc,
                typeUser: 2 // Definindo typeUser como 2 para fornecedores
            });

            return newSupplier ? newSupplier : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para encontrar todos os fornecedores
    async findAll() {
        try {
            const allSuppliers = await this.Supplier.findAll();
            return allSuppliers ? allSuppliers : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para encontrar um fornecedor por ID
    async findById(id) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            return supplier ? supplier : null;
        } catch (error) {
            throw error;
        }
    }

    // Método de login para fornecedores
    async login(email, password) {
        try {
            const supplier = await this.Supplier.findOne({
                where: { email }
            });

            if (supplier) {
                // Verificando se a senha bate com a senha criptografada
                if (await bcrypt.compare(password, supplier.password)) {
                    // Gerando token para o fornecedor
                    const token = await auth.generateToken(supplier);
                    supplier.dataValues.token = token;
                    supplier.dataValues.password = ""; // Não exibir a senha
                } else {
                    throw new Error('Senha inválida');
                }
            }
            return supplier ? supplier : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar os dados de um fornecedor
    async update(id, email, password, cnpj, nomeFornecedor, dataNasc) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            if (!supplier) {
                throw new Error('Fornecedor não encontrado');
            }

            // Criptografando a senha se fornecida
            let updatedPassword = password;
            if (password) {
                updatedPassword = await bcrypt.hash(password, parseInt(roundSalts));
            }

            // Atualizando os dados do fornecedor
            const updatedSupplier = await supplier.update({
                email: email || supplier.email,
                password: updatedPassword,
                cnpj: cnpj || supplier.cnpj,
                nomeFornecedor: nomeFornecedor || supplier.nomeFornecedor,
                dataNasc: dataNasc || supplier.dataNasc
            });

            return updatedSupplier;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SupplierService;
