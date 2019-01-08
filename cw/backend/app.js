const express = require('express');
const bodyPareser = require('body-parser');
const Posts = require('./routes/posts');
const Orders = require('./routes/order');
const User = require('./routes/user');


var mongoose = require('mongoose');

const app = express();
mongodb://tukva:<dbpassword>@ds251894.mlab.com:51894/blog2
mongoose.connect('mongodb://JetPie:Qwerty4121@ds055895.mlab.com:55895/shop', { useNewUrlParser: true }).then(() => {
    console.log('connected DataBase');
}).catch(() => {
    console.log('connected is fail');
});

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended: false}));

//Для того чтобы на бек и фронтенд работали на разных поратх
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type , Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET , POST , DELETE , PUT, PATCH , OPTIONS");
    next();
});

app.use("/users", User);
app.use("/products" , Posts);
app.use("/orders" , Orders);
module.exports = app;
