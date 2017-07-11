var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

// Step 1: Write your schemas here!
// Remember: schemas are like your blueprint, and models
// are like your building!
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String
});


var puppySchema = mongoose.Schema({
  name: String,
  brain: {
    type: String,
    enum: ['big', 'small', 'medium', 'pea-sized', 'peter-sized']
  },
  imageUrl: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Step 2: Create all of your models here, as properties.
var User = mongoose.model('User', userSchema);
var Puppy = mongoose.model('Puppy', puppySchema);

// Step 3: Export your models object
module.exports = {
  User: User,
  Puppy: Puppy
}
