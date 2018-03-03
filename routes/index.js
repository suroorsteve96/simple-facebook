"use strict";
var express = require("express");
var router = express.Router();
var app = express();
app.use(express.static(__dirname + '/public'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://tamara:Saja1996-@ds149138.mlab.com:49138/last_project').then(function () {
        console.log("Connected");
    }
).catch(function (error) {
        console.log(error.message);

    });
router.get('/', function (req, res) {
    res.render('index');
});
var posts = mongoose.model('posts', {
    // Username: String,
    postUser: String,
    postBody: String,
    date: Date,
    postImage: String
});

var userAth = mongoose.model('userAth', {
    userName: String,
    userPassword: String,
    userNumber:Number,
});
router.get('/api/userAth', function (req, res) {
    userAth.find(function (error, userAth) {
        res.json(userAth); //find the model in the database
    });
});
router.post('/api/userAth', function (req) { //insert in the database
    var newUser = req.param('users'); // here its param but in the ejs should be params ...
    // the name in () should by the same as the what i have send
    var dbuser = new userAth(newUser); //after the new it should have the model name
    dbuser.save().then(function () { //to save to the database
    }).catch(function (value) { //to see the error
        console.log(value.message);//just to check


    });
});
var message = mongoose.model('message', {
    user: String,
    message: String
});

router.get('/api/message', function (req, res) {
    message.find(function (error, message) {
        res.json(message); //find the model in the database
    });
});

router.get('/api/posts', function (req, res) {
    posts.find(function (error, posts) {
        res.json(posts); //find the model in the database
    });
});

router.post('/api/message', function (req) { //insert in the database
    var newMessage = req.param('messages'); // here its param but in the ejs should be params ...
    // the name in () should by the same as the what i have send
    var dbMassages = new message(newMessage); //after the new it should have the model name
    dbMassages.save().then(function () { //to save to the database
        console.log("saved"); //just to check
    }).catch(function (value) { //to see the error
        console.log(value.message);//just to check


    });
});
router.post('/api/posts', function (req, res) { //insert in the database
    var newPosts = req.param('posts'); // here its param but in the ejs should be params ...
    // the name in () should by the same as the what i have send
    console.log(req.param('posts'));// just  to check
    var dbPosts = new posts(newPosts); //after the new it should have the model name
    dbPosts.save().then(function () { //to save to the database
        res.json({
            isSuccess: true,
            message: " post added "
        });
        console.log("saved"); //just to check
    }).catch(function (value) { //to see the error
        console.log(value.message);//just to check


    });
});

router.delete('/api/posts', function (req) {
    console.log(req.param('id')); //just to check
    posts.findByIdAndRemove(req.param('id')).then(function () { //findByIdAndRemove to take an id and then remove it from the database
        console.log('removed');//just to check

    });


});
router.delete('/api/message', function (req) {
    message.findByIdAndRemove(req.param('id')).then(function () { //findByIdAndRemove to take an id and then remove it from the database

    });


});
router.put('/api/posts',function (req) {
    var editing = req.param('post');
    posts.findByIdAndUpdate(editing._id,editing).then(function () {
        console.log("Cartoon Updated!");
    } ).catch(function (error) {

            console.log( error.message);
    });});




module.exports = router;
