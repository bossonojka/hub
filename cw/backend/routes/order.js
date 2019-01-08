const express = require("express");
const bodyPareser = require('body-parser');
var dateTime = require('node-datetime');

const router = express.Router();
var OrderModel = require('../models/orderScheme');
var UserModel = require('../models/orderScheme.js');

router.post("", function (req, res, next) {

    var dt = dateTime.create();
    const order = new OrderModel({
        lines: req.body.lines,
        cartPrice: req.body.cartPrice,
        user: req.body.user,
        date: dt.format('Y-m-d H:M:S'),
        checked: false
    });
    console.log(order);
    order.save();
    res.status(201).json(order);


});

router.get('', (req, res, next) => {

    OrderModel.find({}, function (err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        res.send(result);
    })
})

router.delete('/:id', (req, res, next) => {
    OrderModel.deleteOne({_id: req.params.id}).then(result => {
// res.status(200).json(result);
        console.log('delet elem' + result);
    })
});

router.put('/:id', async function (req, res) {


    // const candidate = await UserModel.findOne({email: req.body.email});

    // if (!candidate) {
    console.log("ZAAAWLOLOLOLO");
    var id = req.params.id;
    console.log(id);
    var lines = req.body.lines;
    console.log(lines);
    var cartPrice = req.body.cartPrice;
    var user = req.body.user;
    var date = req.body.date;
    var checked = req.body.checked;

    OrderModel.findOneAndUpdate(
        {_id: id},
        {
            lines,
            cartPrice,
            user,
            date,
            checked
        },
        {
            returnOriginal: true
        },
        function (err, result) {
            if (err)
                res.send(result);
        });
});


module.exports = router;