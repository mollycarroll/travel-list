const express = require('express');
const places = express.Router();
const Place = require('../models/places.js');
const Country = require('../models/countries.js');
const axios = require('axios');

const { isAuthenticated } = require('../services.js');

// seed countries so there is a collection of countries 
places.get('/seedcountries', (req, res) => {
    const jsonURL = 'https://flagcdn.com/en/codes.json';

    const baseURL = 'https://flagcdn.com/w320/';

    axios.get(jsonURL).then((data) => {

        for (let key in data.data) { // let key, value does not work here -- how to access the value?

            Country.create(
                {   
                    countryCode: key.toUpperCase(), // can I also add countryName: value somehow?
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

// this displays all countries as JSON in the browser
places.get('/flagurl', (req, res) => {
    Country.find({}, (error, allCountries) => {
        res.send(allCountries);
    })
})

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

// get route for search form on a page
// type in country name, then try to query the countries collection to match (searchable collection of countries)

places.get('/search/:countryCode', (req, res) => {
    console.log(req.params.countryCode)

    // Country.find({}, (error, countries) => {
    //     res.render('places/search.ejs', {
    //         allCountries: countries,
    //         currentUser: req.session.currentUser
    //     }) 
    // })
    
    Country.findOne({ countryCode: req.params.countryCode }, (error, foundCountry) => {
        console.log(foundCountry.flagImg); 
        res.send(foundCountry.flagImg);
    })
})
// when I go to the Search page, the first country is console logged somehow via findOne -- the form should indicate which country and the console log shouldn't fire until the form is submitted

// seed - need to change country: to its Country reference somehow
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

    // how do I use the drop down menu values for the Place's country: key?

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