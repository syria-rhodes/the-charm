const dotenv = require('dotenv')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cloverRoute = require('./routes/clover')
const orderRoute = require('./routes/order')
const productRoute = require('./routes/product')
const googleRoute = require('./routes/google')
const cors = require('cors');
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected...'))
.catch(err => console.log(err));

app.use(cors({origin:true,credentials: true}));
app.use(express.json())

app.use('/api/clover', cloverRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/google', googleRoute)



app.listen(process.env.PORT || 5000, () => {
    console.log('serving is running...')
})