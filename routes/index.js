var express = require('express');
var router = express.Router();
var Puppy = require('../models').Puppy
var User = require('../models').User

/* GET home page. */
router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    //try without next
    return next();
  }
})

router.get('/', function(req, res, next) {
  // Your code here.
  res.send(200)
});

router.get('/home', function(req, res) {
  var names = ["lisa", "cindy"]
  // var names = [{name: "lisa"}, {name: "cindy"}]
  Puppy.find()
  .populate('owner')
  .exec(function(err, allPuppies) {
    if (err) {
      console.log("error: ", err);
      res.send(500);
    }
    else {
      console.log("all puppies are: ", allPuppies);
      res.render('peterspuppies', {
        puppies: allPuppies
      });
    }
  })

})



router.post('/addPuppy', function(req, res) {
  User.findOne({username: req.body.ownerName}, function(err, user){

    var id = user._id;

    var newPuppy = new Puppy({
      name: req.body.puppyName,
      brain: req.body.brain,
      imageUrl: req.body.imageUrl,
      owner: id
    })

    newPuppy.save(function(err, savedPuppy) {
      if (err) {
        console.log("error: ", err);
        res.send(500);
      }
      else {
        console.log("saved a new puppy: ", savedPuppy);
        res.redirect('/home')
      }
    })
  })

})


module.exports = router;
