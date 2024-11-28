var express = require('express');
var router = express.Router();
const SupplierController = require('../controllers/supplierController');  // Importa o controlador
const db = require('../models');
const supplierService = new (require('../services/supplierService'))(db.Supplier);

// Instanciando o controlador
const supplierControllerInstance = new SupplierController(supplierService);  // Renomeado para evitar conflito

// Definindo as rotas
router.post('/newSupplier', supplierControllerInstance.createSupplier.bind(supplierControllerInstance));

router.get('/', supplierControllerInstance.findAllSuppliers.bind(supplierControllerInstance));

router.get('/:id', supplierControllerInstance.findSupplierById.bind(supplierControllerInstance));

router.post('/login', supplierControllerInstance.login.bind(supplierControllerInstance));

router.put('/:id', supplierControllerInstance.update.bind(supplierControllerInstance));

module.exports = router;
