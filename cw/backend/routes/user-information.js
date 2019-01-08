const express = require('express');
const bodyPareser = require('body-parser');
const jwt = require('jsonwebtoken');
var UserModel = require('../models/userScheme');
var router = express.Router();

function check_login(login, password) {
    UserModel.findOne({email: login},
        function (err, result) {
            if (err) {
                return {
                    message: "User not found"
                }
            }
            if (result) {
                if (result.isValid(password)) {
                    return {
                        is_autorization: true,
                        user: {
                            name: result.name,
                            role: result.role,
                        }
                    }
                }
                else {
                    return {message: "User email is not registered"};
                }
            }
        })
}

function get_token(user, secret) {
    var token = jwt.sign(user,secret, {expiresIn: 5000});
    return token;
}

function get_user(token , secret){
    var user = jwt.verify(token,secret);
    return user;
}


router.all("*", function (req, res, next) {
    next();

});


module.exports = {
    router: router,
    check_login,
    get_token,
    get_user
};