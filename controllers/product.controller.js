var Product = require('../models/product.model');

module.exports.index = async (req, res) => {
    var products = await Product.find();
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    var totalPage = parseInt(products.length/6);
    if (page % 6 !== 0) ++totalPage;
    res.render('shop/index',{
        products: products.slice(start, end),
        page: page,
        priviousPage: page - 1,
        nextPage: page + 1,
        totalPage: totalPage
    });
};