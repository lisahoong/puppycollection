var express = require('express');
var router = express.Router();
var User = require('../models').User;

module.exports = function(passport) {

  router.get('/login', function(req, res) {
    res.render('login')
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));

  router.get('/signup', function(req, res) {
    res.render('signup');
  })

  router.post('/signup', function(req, res) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err, savedUser) {
      if (err) {
        console.log("Error: ", err);
        res.send(500);
      }
      else {
        console.log("Saved a new user! ", savedUser);
        res.redirect('/login');
      }
    })
  })

  return router;
}
