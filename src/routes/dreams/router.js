var express = require('express');

var router = express.Router();

const Dream = require('../../controllers').Dream;


// http://expressjs.com/en/starter/basic-routing.html
router.get('/', function(request, response) {
  response.sendFile(request.rootPath + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
router.get('/getDreams', function(request, response) {
  const dream = new Dream();
  dream.getAll(function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

router.post('/postDreams', function(request, response) {
  const dream = new Dream(request.body.dream);
  dream.create();
  response.send('ok');
});

module.exports = router;