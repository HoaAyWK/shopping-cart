var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    paymentId: {type: String, required: true}
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;