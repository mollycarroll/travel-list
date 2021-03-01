const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

const {logRequest} = require('./services.js');

// import and configure dotenv
require('dotenv').config();

// app configuration
const app = express();
const db = mongoose.connection;
const port = 3000;
const mongodbURI = process.env.MONGODBURI

// controllers
const placesController = require('./controllers/places_controller.js');
const sessionsController = require('./controllers/sessions_controller.js');
const usersController = require('./controllers/users_controller.js');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(
    session(
      {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
      }
    )
  );
app.use(logRequest);

app.use('/places', placesController);
app.use('/sessions', sessionsController);
app.use('/users', usersController);

// mongoose connection logic
mongoose.connect(mongodbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// Connection Error/Success
// Define callback functions for various events
db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))


// routes
app.get('/', (req, res) => {
    res.redirect('/places');
})

// listener
app.listen(port, () => {
    console.log('listening on port ' + port);
});