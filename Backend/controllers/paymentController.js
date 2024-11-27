class PaymentController {
    constructor(PaymentService){
        this.paymentService = PaymentService
    }

    async payPix(req, res){
        const { userId } = req.body;

        try {
            const newPayment = await this.paymentService.payPix(userId);
            res.status(200).json(newPayment);
            res.send();
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao pagar via pix."});
        }
    }

    async payCreditCard(req, res){
        const { userId } = req.body;

        try {
            const newPayment = await this.paymentService.payCreditCard(userId);
            res.status(200).json(newPayment);
            res.send();
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao pagar via cartão de crédito."});
        }
    }

    async paymentStatus(req, res) {
        const { transactionId } = req.query;
        try {
            const payment = await this.paymentService.paymentStatus(transactionId);
            
            res.status(200).json(payment);  
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao verificar o pagamento." });
        }
    }
}    

module.exports = PaymentController
