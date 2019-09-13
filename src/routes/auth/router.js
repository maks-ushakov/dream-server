var express = require('express');
const { body } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

var router = express.Router();

router.all('/login', function (req, res) {
  if (!req.session.auth) {
    req.session.role = 'admin';
    req.session.auth = true;
    res.redirect('/admin')
  }
  else {
    res.redirect('/');
  }
});

router.all('/logout', function (req, res) {
  req.session.destroy(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
});

module.exports = router;