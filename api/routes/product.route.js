var express = require('express');

var productController = require('../controllers/product.controller');
var productMiddleware = require('../middlewares/product.middleware');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productMiddleware.getProduct, productController.getProduct);
router.post('/', authMiddleware, productController.postProduct);
router.patch('/:id', productMiddleware.getProduct, productController.patchProduct);
router.delete('/:id', productMiddleware.getProduct, productController.deleteProduct);

module.exports = router;