var express = require('express');
var router = express.Router();
const db = require('../models')
const auth = require("../auth")

const PaymentService = require("../services/paymentService");
const PaymentController = require("../controllers/paymentController");

const paymentService = new PaymentService(db.Payment);
const paymentController = new PaymentController(paymentService);

router.get('/teste', function (req, res, next) {
	res.send("Modulo do pagamento rodando.")
})

router.post('/pix', auth.verifyToken, async (req, res) => {
	paymentController.payPix(req, res);
})

router.post('/credit-card', auth.verifyToken, async (req, res) => {
	paymentController.payCreditCard(req, res);
})

router.get('/status', auth.verifyToken, async (req, res) => {
	paymentController.paymentStatus(req, res);
})

module.exports = router;
