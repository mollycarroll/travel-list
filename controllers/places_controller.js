const express = require('express');
const places = express.Router();
const Place = require('../models/places.js');

const { isAuthenticated } = require('../services.js');

// routes
//index
places.get('/', (req, res) => {
    Place.find({}, (error, places) => {
        res.render('places/index.ejs', {
            allPlaces: places,
            currentUser: req.session.currentUser
        })
    })
});

// seed
places.get('/seed', (req, res) => {
    Place.create([
        {
            city: 'Berlin',
            country: 'Germany',
            img: 'https://www.themasculinetraveler.com/wp-content/uploads/2017/04/Berlin-Germany.jpg',
            visited: false
        }, 
        {
            city: 'Galway', 
            country: 'Ireland',
            img: 'https://www.irelandbeforeyoudie.com/wp-content/uploads/2014/10/Dunguaire-Castle.jpg',
            visited: true
        },
        {
            city: 'Tokyo',
            country: 'Japan',
            img: 'https://globalxnetwork.com/wp-content/uploads/2015/03/tokyo-japan-3.jpg',
            visited: false
        }
    ], (err, data) => {
        res.redirect('/places');
    })
});

// new
places.get('/new', isAuthenticated, (req, res) => {
    res.render('places/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// post (create)
places.post('/', (req, res) => {
    if (req.body.visited === 'on') {
        req.body.visited = true;
    } else {
        req.body.visited = false;
    }
    Place.create(req.body, (error, createdPlace) => {
        res.redirect('/places');
    })
});

// edit
places.get('/:id/edit', isAuthenticated, (req, res) => {
    Place.findById(req.params.id, (error, foundPlace) => {
        res.render('places/edit.ejs', {
            place: foundPlace,
            method: 'PUT',
            currentUser: req.session.currentUser
        })
    })
});

// update
places.put('/:id', (req, res)=>{
    if(req.body.visited === 'on'){
        req.body.visited = true;
    } else {
        req.body.visited = false;
    }
    Place.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
      res.redirect('/places');
    })
  });

// show
places.get('/:id', isAuthenticated, (req, res) => {
    Place.findById(req.params.id, (error, foundPlace) => {
        res.render('places/show.ejs', {
            place: foundPlace,
            currentUser: req.session.currentUser
        })
    })
});

// delete
places.delete('/:id', (req, res) => {
    Place.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (error, data) => {
        res.redirect('/places');
    })
});

module.exports = places;