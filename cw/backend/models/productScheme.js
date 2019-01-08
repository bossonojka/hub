var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    firm: String,
    url: String,
    specifications: String,
    type: String,
    price: Number,
    bestProduct:String,
});


var newDb = mongoose.model('Product', productSchema);

module.exports = newDb;
