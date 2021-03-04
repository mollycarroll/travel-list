const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    });
});

router.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (error, foundUser) => {
        if (error) {
            console.log(error);
            res.send('Something went wrong in our database.');
        } else if (!foundUser) {
            res.send('Sorry, no user found. Click <a href="/users/new">here</a> to create a new user.');
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/places');
            } else {
                res.send('Sorry passwords did not match');
            }
        }
    });
});

// delete
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('sessions/new');
    });
});

module.exports = router;