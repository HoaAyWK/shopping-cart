var express = require('express');

var cartController = require('../controllers/cart.controller');
var checkoutMiddleware = require('../middlewares/checkout.middleware');

var router = express.Router();

router.get('/add-to-cart/:id', cartController.cart);
router.get('/shopping-cart', cartController.shoppingCart);
router.get('/reduce/:id', cartController.reduceByOne);
router.get('/remove/:id', cartController.remove);
router.get('/checkout', checkoutMiddleware.isSignedIn, cartController.checkout);
router.get('/complete', cartController.complete);

router.post('/checkout', checkoutMiddleware.isSignedIn, cartController.postCheckout);

module.exports = router;