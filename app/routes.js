'use strict';
//require express
var express = require('express');
var path    = require('path');


//create our router
var router = express.Router();

//export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
  res.render('pages/home');
});

//route for about
router.get('/about', function(req, res) {
  var users = [
    { name: 'Holly', email: 'holly@scotch.io', avatar: ''},
    { name: 'Chris', email: 'chris@scotch.io', avatar: ''},
    { name: 'Ado', email: 'Ado@scotch.io', avatar: ''},
    { name: 'Samantha', email: 'Samantha@scotch.io', avatar: ''}
  ];
  res.render('pages/about', {users: users});
});

router.get('/contact', function(req, res) {
  res.render('pages/contact');
});


router.post('/contact', function(req, res) {
  console.log(req);
  console.log(req.body);
  res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!\n');
});
