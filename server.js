const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();

// JSON Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes

// Get request
app.get('/', (req, res) => {
    res.send('Welcome to node API')
})

app.get('/blog', (req, res) => {
    res.send('welcome to blog page')
})

// Post request
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ message: error.message })
    }
})

// Get request
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);

    } catch (error) {
        console.log(err.message);
        res.status(500).json({ message: error.message })
    }
})

// Get request using product ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})

// Put request
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json({ message: `connot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

// delete request
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `We can not find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect("mongodb+srv://Owais:Mongodb321@owaisapi.hbpayqz.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("owais is connected to mongoDB")
        app.listen(3000, function () {
            console.log(`app is running on port number 3000`)
        })

    }).catch((err) => {
        console.log(err)
    }) 
