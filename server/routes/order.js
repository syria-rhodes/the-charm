const router = require('express').Router();
const Order = require('../models/Order')

router.post('/add', async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = newOrder.save()
        res.status(200).json(savedOrder)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;