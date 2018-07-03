const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
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

// USER MODEL CUSTOM METHODS

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
    .toString();
  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return user;
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

// MONGOOSE MIDDLEWARE

UserSchema.pre("save", function(next) {
  const user = this;
  // Check if Password was modified - If password modified we should necrypt
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// How you define Model Methids
UserSchema.statics.findByToken = function(token) {
  // Model methods get called with the Model as this this binding
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
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
    _id: decoded._id,
    // Checken the nest value in tokens
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }else {
          reject("Authentication does not match...")
        }
        if (err) {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
