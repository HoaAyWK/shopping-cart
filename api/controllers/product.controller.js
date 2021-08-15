var Product = require('../../models/product.model');

module.exports.getProducts = async (req, res) => {
    try {
        var products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.getProduct = (req, res) => {
    res.json(res.product);
};

module.exports.postProduct = async (req, res) => {
    var product = new Product({
        imgPath: req.body.imgPath,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    try {
        var newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

module.exports.patchProduct = async (req, res) => {
    if (req.body.imgPath !== null) {
        res.product.imgPath = req.body.imgPath;
    }
    if (req.body.title !== null) {
        res.product.title = req.body.title;
    }
    if (req.body.description !== null) {
        res.product.description = req.body.description;
    }
    if (req.body.price !== null) {
        res.product.price = req.body.price;
    }
    try {
        var updateProduct = await res.product.save();
        res.json(updateProduct)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

module.exports.deleteProduct = (req, res) => {
    try {
        res.product.remove();
        res.json({message: 'Deleted product'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
