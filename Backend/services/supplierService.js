const db = require('../models');
const auth = require('../auth');
const bcrypt = require('bcrypt');
const roundSalts = 10;

class SupplierService {
    constructor(supplierModel) {
        this.supplier = supplierModel;
    }

    // Método para criar um novo fornecedor
    async create(email, password, cnpj, nomeFornecedor, dataNasc) {
        try {
            // Verificando se já existe um fornecedor com o mesmo email ou CNPJ
            const existingSupplier = await this.supplier.findOne({
                where: {
                    [db.Sequelize.Op.or]: [{ email }, { cnpj }]
                }
            });

            if (existingSupplier) {
                throw new Error('Fornecedor com o mesmo e-mail ou CNPJ já existe');
            }

            // Criptografando a senha
            const hashPassword = await bcrypt.hash(password, roundSalts);

            // Criando o novo fornecedor
            const newSupplier = await this.supplier.create({
                email,
                password: hashPassword,
                cnpj,
                nomeFornecedor,
                dataNasc,
                typeUser: 2 // Definindo typeUser como 2 para fornecedores
            });

            return newSupplier;
        } catch (error) {
            throw new Error(`Erro ao criar fornecedor: ${error.message}`);
        }
    }

    // Método para encontrar todos os fornecedores
    async findAll() {
        try {
            const allSuppliers = await this.supplier.findAll();
            return allSuppliers;
        } catch (error) {
            throw new Error(`Erro ao buscar fornecedores: ${error.message}`);
        }
    }

    // Método para encontrar um fornecedor por ID
    async findById(id) {
        try {
            const supplier = await this.supplier.findByPk(id);
            if (!supplier) {
                throw new Error('Fornecedor não encontrado');
            }
            return supplier;
        } catch (error) {
            throw new Error(`Erro ao buscar fornecedor por ID: ${error.message}`);
        }
    }

    // Método de login para fornecedores
    async login(email, password) {
        try {
            const supplier = await this.supplier.findOne({
                where: { email }
            });

            if (!supplier) {
                throw new Error('Fornecedor não encontrado');
            }

            // Verificando se a senha bate com a senha criptografada
            const isPasswordValid = await bcrypt.compare(password, supplier.password);
            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            // Gerando token para o fornecedor
            const token = await auth.generateToken(supplier);
            supplier.dataValues.token = token;
            supplier.dataValues.password = ""; // Não exibir a senha

            return supplier;
        } catch (error) {
            throw new Error(`Erro ao fazer login: ${error.message}`);
        }
    }

    // Método para atualizar os dados de um fornecedor
    async update(id, email, password, cnpj, nomeFornecedor, dataNasc) {
        try {
            const supplier = await this.supplier.findByPk(id);
            if (!supplier) {
                throw new Error('Fornecedor não encontrado');
            }

            // Verificando se já existe outro fornecedor com o mesmo e-mail ou CNPJ
            const existingSupplier = await this.supplier.findOne({
                where: {
                    [db.Sequelize.Op.or]: [{ email }, { cnpj }],
                    // Garantindo que o fornecedor atual não seja incluído na busca
                    [db.Sequelize.Op.and]: [{ id: { [db.Sequelize.Op.ne]: id } }]
                }
            });

            if (existingSupplier) {
                throw new Error('Fornecedor com o mesmo e-mail ou CNPJ já existe');
            }

            // Se a senha for fornecida, atualizamos, senão mantemos a atual
            let updatedPassword = supplier.password;
            if (password) {
                updatedPassword = await bcrypt.hash(password, roundSalts);
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
            throw new Error(`Erro ao atualizar fornecedor: ${error.message}`);
        }
    }
}

module.exports = SupplierService;
