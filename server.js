// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
const {twig} = require('twig');
var session = require('express-session');
var app = express();

var sessionConfig = {
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour 
  } 
}

app.set('view engine', 'twig');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(session(sessionConfig));

// set rootPath
// http://qaru.site/questions/34821/determine-project-root-from-a-running-nodejs-application/254012#254012
app.use(function(req, res, next) {
  req.rootPath = __dirname;
  next();
});

var db = require('./src/db');
var routes = require('./src/routes')
app.use('/', routes.dreams);
app.use('/admin', routes.admin);
app.use('/auth', routes.auth);

// listen for requests :)
var listener = app.listen(process.env.PORT || 4000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
