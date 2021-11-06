const router = require('express').Router();
const Product = require('../models/Product')

// Add new product
router.post('/add', async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product)
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get product by category
router.get('/', async (req, res) => {
    const qCategory = req.query.category
    try {
        let products;
        if (qCategory) {
            products = await Product.find({category: {
                $in: [qCategory]
            }})
        }
        res.status(200).send(products)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;