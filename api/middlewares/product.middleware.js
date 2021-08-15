var Product = require('../../models/product.model');

module.exports.getProduct = async (req, res, next) => {
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({message: 'Cannot find product.'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.product = product;
    next();
};