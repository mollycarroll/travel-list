const express = require('express');
const places = express.Router();
const Place = require('../models/places.js');
const Country = require('../models/countries.js');
const axios = require('axios');

const { isAuthenticated } = require('../services.js');

// seed countries
places.get('/seedcountries', (req, res) => {
    const jsonURL = 'https://flagcdn.com/en/codes.json';

    const baseURL = 'https://flagcdn.com/w320/';

    axios.get(jsonURL).then((data) => {

        for (let [key, value] of Object.entries(data.data)) { 

            Country.create(
                {   
                    countryName: value,
                    countryCode: key.toUpperCase(),
                    flagImg: baseURL + key + '.png',
                }, (error, country) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(country);
                }
            })
        }

        res.send('Got seed country data');
    })
});

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
            img: 'https://flagcdn.com/w320/de.png',
            visited: false
        }, 
        {
            city: 'Galway', 
            country: 'Ireland',
            img: 'https://flagcdn.com/w320/ie.png',
            visited: true,
            notes: 'Galway has beautiful Irish landscapes and a rich history. I loved visiting the Cliffs of Moher!'
        },
        {
            city: 'Tokyo',
            country: 'Japan',
            img: 'https://flagcdn.com/w320/jp.png',
            visited: false,
            notes: 'こんにちは！ I am learning Japanese to visit Japan.'
        },
        {
            city: 'Lima',
            country: 'Peru',
            img: 'https://flagcdn.com/w320/pe.png',
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

    Country.findOne({ countryName: req.body.country }, (error, foundCountry) => {
        req.body.img = foundCountry.flagImg;
    
        Place.create(req.body, (error, createdPlace) => {
            res.redirect('/places');
        })

    });
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
places.put('/:id', (req, res) => {

    if(req.body.visited === 'on'){
        req.body.visited = true;
    } else {
        req.body.visited = false;
    }

    Country.findOne({ countryName: req.body.country }, (error, foundCountry) => {

        req.body.img = foundCountry.flagImg;

        Place.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
            res.redirect('/places')
        })

    })
  });

// show
places.get('/:id', (req, res) => {
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