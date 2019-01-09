const express = require("express");
const bodyPareser = require('body-parser');

const router = express.Router();
var ProductModel = require('../models/productScheme');

router.post("", function (req, res, next) {

    const product = new ProductModel({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        specifications: req.body.specifications,
        price: req.body.price,
        type: req.body.type,
        url: req.body.url,
        bestProduct: req.body.bestProduct
    });

    product.save();
    res.status(201).json(product);
    next();
});

router.delete('/:id', (req, res, next) => {
    ProductModel.deleteOne({_id: req.params.id}).then(result => {
// res.status(200).json(result);
        console.log('delet elem' + result);
    })
});

router.put('/:id', function (req, res) {

    var id = req.params.id;
    var name = req.body.name;
    var manufacturer = req.body.manufacturer;
    var description = req.body.description;
    var specifications = req.body.specifications;
    var type = req.body.type;
    var price = req.body.price;
    var url = req.body.url;
    var bestProduct = req.body.bestProduct;

    ProductModel.findOneAndUpdate({_id: id},
        {
            name,
            manufacturer,
            description,
            specifications,
            type,
            price,
            url,
            bestProduct
        },
        {
            returnOriginal: true
        },
        function (err, result) {
            if (err)
            res.send(result);
        });
});


router.get('', (req, res, next) => {
    ProductModel.find({}, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})

router.get('/:id', function (req, res, next) {

    var id = req.params.id;

    ProductModel.findById(id, function (err, result) {
        if (err) {
            res.status(404).json({message: 'not found'});
        }

        res.status(200).json(result);
    })
})

// router.get('/:findFirm', function (req, res, next) {
//     ProductModel.findOne({manufacturer: req.params.findFirm}).then(result => {
//             console.log(result);
//             if (result)
//                 res.status(200).json(reuslt);
//             else
//                 res.status(404).json({message: 'Product not found'});
//         }
//     )
// })


router.delete('/:id', (req, res, next) => {
    ProductModel.deleteOne({_id: req.params.id}).then(result => {
// res.status(200).json(result);
        console.log('delet elem' + result);
    })
})

module.exports = router;