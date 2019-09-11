var express = require('express');
const { body } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

var router = express.Router();

const Admin = require('../../controllers').Admin;


// http://expressjs.com/en/starter/basic-routing.html
router.get('/', function(request, response) {
  response.sendFile(request.rootPath + '/views/admin.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
router.get('/dreams', function(request, response) {
  const admin = new Admin();
  admin.getAll(function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

router.post('/dreams', [body('dream').not().isEmpty().trim().escape()],function(request, response) {
  const dream = new Admin(request.body.dream);
  dream.create();
  response.send('ok');
});

router.delete('/dreams/:id', function(request, response) {
  const dream = new Admin(request.body.dream);
  dream.remove(request.params.id);
  response.send('ok');
});

router.delete('/dreams', function(request, response) {
  const dream = new Admin(request.body.dream);
  dream.drop();
  response.send('ok');
});

module.exports = router;