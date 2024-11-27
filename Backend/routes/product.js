var express = require('express');
var router = express.Router();
const db = require('../models')
const auth = require("../auth")

const ProductService = require("../services/productService")
const ProductController = require("../controllers/productController")

const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

router.get('/teste', function (req, res, next) {
	res.send("Modulo de produtos rodando.")
})

router.post('/', auth.verifyToken, async (req, res) => {
	productController.createProduct(req, res);
})

router.get('/', auth.verifyToken, async (req, res) => {
	productController.findAllProducts(req, res)
})

router.put('/', auth.verifyToken, async (req, res) => {
	productController.updateProductById(req, res);
})

router.delete('/', auth.verifyToken, async (req, res) => {
	productController.deleteById(req, res);
})

module.exports = router;
