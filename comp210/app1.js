/**
* @Author: Alcwyn Parker <alcwynparker>
* @Date:   2017-07-12T21:21:51+01:00
* @Email:  alcwynparker@gmail.com
* @Project: Unlocking Potential
* @Filename: app.js
* @Last modified by:   alcwynparker
* @Last modified time: 2017-08-10T23:41:48+01:00
*
* mongodb://127.0.0.1:27017/
*
* Make sure that you have mongoDB installed and running.
* I used Brew to install mongoDB and so the command to get it up and running is:
* brew services start mongodb
* or
* brew services stop mongodb
*
*
* import the data into mongoDB:
* mongo resourceAPI < ResourceTestData.js
*
*/

const express = require('express');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');                                            /* TODO: Add library 1 - help with creating, signing, and verifying tokens */

const cors = require('cors');                                                   /* TODO: Add library 2 - to allow preflight response

const config = require('./config');                                             /* TODO: Import config */

const resourceRouter = require('./routes/ResourceRoutes')();
const userRouter = require('./routes/UserRoutes')();                            /* TODO: Add the UserRoutes.js - you will need to make one */


//create am instance of express
let app = express();
app.use(cors());

// Mongoose provides a straight-forward, schema-based solution to
// model your application data. It includes built-in type casting,
// validation, query building, business logic hooks and more, out of the box.
// **** IMPORTANT: At the time of writing, use version 4.10.8 -
// npm install mongoose@4.10.8 --save
let mongoose = require('mongoose');

// connect to MongoDB using Mongoose
let db = mongoose.connection;

// output some useful info just in case
db.on('error', (err)=>{ console.log(err)});
db.once('open', function() { console.log('MongoDB: Connected!'); });
db = mongoose.connect('mongodb://localhost/resourceAPI');


// set up a port that defaults to 3000 unless there is a env variable
// (this will change in gulp)
let port = process.env.PORT || 3000;

// setup middleware to read the POST data
// if there is json in the body then this will make it available using req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Allow from out app
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// set resource routes
app.use('/api', resourceRouter);

// set user routes
app.use('/users', userRouter);                                                   /* TODO: add user routes */

// setup a route
app.get('/', (req, res) => {                   // arrow functions
  res.send('Welcome to Express');
});

// begin listening on the port
app.listen(port, () => {
  console.log(`Now running on port: ${port}`);     // cheeky string literal
});
