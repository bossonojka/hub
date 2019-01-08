const express = require("express");
const bodyPareser = require('body-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();
var UserModel = require('../models/userScheme');

router.post("/registration", async function (req, res, next) {

    const candidate = await UserModel.findOne({email: req.body.email});
    if (!candidate) {
        const user = new UserModel({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            adress: req.body.adress,
            city: req.body.city,
            number: req.body.number,
            password: UserModel.hashPassword(req.body.password),
            role: req.body.role,
        });
        user.save();
        res.status(201).json({message: "Данные добавлены"});

    }
    else {
        res.status(201).json({
            message: "Такой email уже занят. Попробуйте другой."
        });
    }
    next();

});

router.put('/:id', async function (req, res) {


    // const candidate = await UserModel.findOne({email: req.body.email});

    // if (!candidate) {
        var id = req.params.id;
        var email = req.body.email;
        var name = req.body.name;
        var surname = req.body.surname;
        var adress = req.body.adress;
        var city = req.body.city;
        var number = req.body.number;
        var password = req.body.password;
        var role = req.body.role;

        UserModel.findOneAndUpdate(
            {_id: id},
            {
                name,
                email,
                surname,
                adress,
                city,
                number,
                password,
                role,
            },
            {
                returnOriginal: true
            },
            function (err, result) {
                if (err)
                    res.send(result);
            });
})

router.delete('/:id', (req, res, next) => {
    UserModel.deleteOne({_id: req.params.id}).then(result => {
// res.status(200).json(result);
        console.log('delet elem' + result);
    })
});

router.get('/usermail/:email', function (req, res, next) {

    var email = req.params.email;
    UserModel.findOne({email: email}, function (err, result) {
        if (err) {
        }
        res.status(201).json(result);
    })
})

router.get('/userid/:id', function (req, res, next) {

    var id = req.params.id;
    UserModel.findById(id, function (err, result) {
        if (err) {
        }
        res.status(201).json(result);
    })
})

router.post("/login", function (req, res, next) {

    let promise = UserModel.findOne({email: req.body.email}).exec();
    promise.then(function (doc) {
        if (doc) {
            console.log(doc);
            UserModel.comparePassword(req.body.password, doc.password, function (err, isMatch) {
                if (err) {
                    console.log('Не существует');
                }
                if (isMatch) {

                    let token = jwt.sign({
                        username: doc.name,
                        role: doc.role,
                        email: doc.email,
                    }, 'secret', {expiresIn: '1h'});
                    res.status(200).json({token: token, role: doc.role, email: doc.email});
                }
                if (!isMatch) {
                    console.log('Пароль не верный');
                }
            })
        }
        else {
            return res.status(501).json({message: 'Invalid Credentials'});
        }
    })
    promise.catch(function (err) {
        return res.status(501).json({message: 'Some interval error'});
    })
})

router.get("", function (req, res, next) {

    UserModel.find({}, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})

router.get('/username', verifyToken, function (req, res, next) {
    return res.status(200).json({
        username: decodedToken.username,
        role: decodedToken.role
    });
})

var decodedToken = '';

function verifyToken(req, res, next) {
    let token = req.query.token;
    jwt.verify(token, 'secret', function (err, tokendata) {
        if (err) {
            return res.status(400).json({message: 'Unauthorized request'});
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    })
}

module.exports = router;