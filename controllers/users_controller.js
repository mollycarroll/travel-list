const express = require('express');
const users = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/users.js');

users.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    });
});


users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    User.create(req.body, (err, newUser) => {
        console.log('User created: ', newUser);
        res.redirect('/sessions/new');
    });
});


module.exports = users;