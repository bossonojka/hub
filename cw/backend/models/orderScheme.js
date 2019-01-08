var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: String,
    firm: String,
    url: String,
    specifications: String,
    type: String,
    price: Number,
    bestProduct:String,
});

var orderProduct = new mongoose.Schema({
    product : Product,
    quantity: Number,
})

var userSchema = new mongoose.Schema({
    email:  String,
    name: String,
    surname: String,
    adress: String,
    city: String,
    password: String,
    role: String,
});

var ordersScheme = new mongoose.Schema({
        lines: [orderProduct],
        cartPrice : String,
        user : { type: userSchema , required : false},
        date : Date,
        checked:Boolean
});

var db = mongoose.model('Order', ordersScheme);

module.exports = db;
