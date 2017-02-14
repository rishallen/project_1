//require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var sass           = require('node-sass');
// var sassMiddleware = require('node-sass-middleware');
var app            = express(); //an instance of app
var port           = 8080;
var path           = require('path');

//use ejs and express layouts
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

// adding the sass middleware
// app.use(sassMiddleware({
//   src: path.join(__dirname + '/public/css'),
//   dest: path.join(__dirname + '/build/css'),
//   debug: true,
//   indentedSyntax: true,
//   outputStyle: 'compressed',
//   prefix: '/css'
// }));

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

//route our app
var router = require('./app/routes');
app.use('/', router);

// //set static files (css and images, etc) Location
app.use(express.static(__dirname + '/public'));


// The static middleware must come after the sass middleware
 // app.use(express.static( path.join( __dirname + '/public')));

//start the server
app.listen(port, function() {
  console.log('app started');
});
