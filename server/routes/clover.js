const router = require('express').Router();
const Clover = require("clover-ecomm-sdk");

require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const API_KEY = process.env.API_KEY;
const ENVIRONMENT = process.env.ENVIRONMENT;

const cloverInst = new Clover(ACCESS_TOKEN, {
    environment: ENVIRONMENT,
});

// define the routes
router.post("/pay", async (req, res) => {
    let tokenId;
    let orderId;
    try {
        await cloverInst.tokens.create({
            card: req.body.card,
            'apiKey': API_KEY,
        }).then((token) => {
            tokenId = token.id;
        }).catch(err => {
            console.log('Getting error type in Token Test - ', err);
        });
    
        await cloverInst.orders.create({
            currency: 'usd',
            email: req.body.email,
            items: req.body.items
        }).then((order) => {
            orderId = order.id;
        }).catch(err => {
            console.log('Error in creating order - ', err)
        })
    
        await cloverInst.orders.pay(
            orderId,
            {source: tokenId},
            ).then((order) => {
                res.status(200).json(order)
        }).catch(err => {
            console.log('Error in payment - ', err)
        })
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;