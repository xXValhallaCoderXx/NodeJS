// Dont need to import mongoose from App as just creating a model
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

// Mongoose custom validations - Handy
// Stores the Schema for a User - Stores all the properties
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    unique: true,
    trim: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "{value} is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minLength: 6 //Of the plain text PW
  },
  // Will have an array of Tokens
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Override Mongoose Method
// Using a normal function as => doesnt bind a this keyword

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

// Create Custom Methods

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access
      },
      process.env.JWT_SECRET
    )
    .toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};


UserSchema.methods.removeToken = function(token){
  // Mongo DB Operator - Remove items from array that match certain criteria
  const user = this;

  // Will remove the whole object
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
}


// Mongoose Middleware


// Need to use regular functions to bind this
UserSchema.pre("save", function(next){
  const user = this;
  // Lets check if PW was modified

  // isModified takes an indivifual property and returns true/false
  // We only want to encrypt if password was modified

  if(user.isModified("password")){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  }else {
    // If not modified simply carry on
    next();
  }
})



// Methos which can be run on the USER Model

UserSchema.statics.findByToken = function(token) {
  // Model methods get called with the Model as this this binding
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch(e){
    /*
    return new Promise((resolve, reject) => {
      reject();
    })*/
    // Simple way
    return Promise.reject();
  }

  // If token is decoded
  // Return this so we can add a .then() in in route where we call this
  return User.findOne({
    "_id": decoded._id,
    // Checken the nest value in tokens
    'tokens.token': token,
    'tokens.access': "auth"
  })
}


UserSchema.statics.findByCredentials = function(email, password) {

  return User.findOne({email}).then(user => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res){
          resolve(user);
        }
        if(err){
          reject();
        }
      })
    })
  })
}


// Pass the UserSchema to the User Object
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};