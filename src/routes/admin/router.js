var express = require('express');
const { body } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

var router = express.Router();

const Admin = require('../../controllers').Admin;


// http://expressjs.com/en/starter/basic-routing.html
router.get('/', isAdmin, function(request, response) {
  // response.sendFile(request.rootPath + '/views/admin.html');
  const admin = new Admin();
  admin.getAll(function(err, dreams) {
    if (!!err) {
      response.render('error.html.twig', {
        error: err,
      })
      return;
    }
    response.render('admin/index.html.twig', {
      messages: {
        error: request.flash('error'),
        info: request.flash('info'),
      },
      dreams: dreams,
    })
  });
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
router.get('/dreams', isAdmin, function(request, response) {
  const admin = new Admin();
  admin.getAll(function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

router.post('/dreams', [body('dream').not().isEmpty().trim().escape(), isAdmin],function(request, response) {
  const dream = new Admin(request.body.dream);
  dream.create();
  response.send('ok');
});

router.delete('/dreams/:id', isAdmin, function(request, response) {
  const dream = new Admin(request.body.dream);
  dream.remove(request.params.id);
  response.send('ok');
});

router.delete('/dreams', isAdmin, function(request, response) {
  const dream = new Admin(request.body.dream);
  dream.drop();
  response.send('ok');
});

function isAdmin(req, res, next) {
  if (!!req.session.role && req.session.role === 'admin') {
    return next();
  }
  req.flash('error', 'You should log in to get access for this part');
  res.redirect('/auth/login');
}

module.exports = router;