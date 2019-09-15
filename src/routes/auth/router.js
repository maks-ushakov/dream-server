var express = require('express');
const { body } = require('express-validator');
// const { sanitizeBody } = require('express-validator');

var router = express.Router();

router.get('/login', function (req, res) {
  if (req.session.auth) {
    return  res.redirect('/admin');
  }
  res.render('admin/login.html.twig', {
    messages: {
      error: req.flash('error'),
      info: req.flash('info'),
    }
  });
});

router.post('/login', function (req, res) {
  if (!req.session.auth) {
    var username = req.body.username;
    var pass = req.body.password;
    if (!!username && !!pass) {
      if(username == process.env.AUTH_LOGIN && pass == process.env.AUTH_PASS) {
        req.session.role = 'admin';
        req.session.auth = true;
        req.flash('info', 'You have logged in sucessfuly');
        return res.redirect('/admin')
      }
      req.flash('error', 'Login or password do not found');
    }
  }
    res.redirect('/auth/login');
});

router.all('/logout', function (req, res) {
  req.session.role = 'anonimous';
  req.session.auth = false;
  req.flash('info', 'You have logged out');
  res.redirect('/');
});

module.exports = router;