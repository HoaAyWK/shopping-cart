var Cart = require('../models/cart.model');
var Product = require('../models/product.model');

module.exports.cart = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, (err, product) => {
        if (err) return res.redirect('/');
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
};

module.exports.shoppingCart = (req, res, next) => {
    if (!req.session.cart) {
        return res.render('shop/cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    var products = cart.generateArray();
    if (products.length === 0) {
        return res.render('shop/cart', {
            products: null
        });
    }
    res.render('shop/cart', {
        products: products,
        totalPrice: cart.totalPrice
    });
};

module.exports.reduceByOne = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart/shopping-cart');
};

module.exports.remove = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart/shopping-cart');
};