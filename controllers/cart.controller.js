require('dotenv').config();
var stripe = require('stripe')(process.env.SECRET_KEY);

var Cart = require('../models/cart.model');
var Product = require('../models/product.model');
var Order = require('../models/order.model');

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

module.exports.complete = (req, res, next) => {
    res.render('cart/complete');
};

module.exports.checkout = (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('cart/checkout', { totalPrice: cart.totalPrice });
};

module.exports.postCheckout = (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: 'usd',
        source: req.body.stripeToken,
        description: 'Test charge'
    }, async (err, charge) => {
        if (err) {
            console.log(error.message);
            req.flash('error', err.message);
            return res.redirect('/cart/checkout');
        }
        var order = await Order.create({
            user: req.user,
            cart: cart,
            name: req.body.name,
            address: req.body.address,
            paymentId: charge.id
        });
        req.session.cart = null;
        res.redirect('/cart/complete');
    });
};