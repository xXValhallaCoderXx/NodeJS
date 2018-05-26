const mongoose = require("mongoose");

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

  const token = jwt.sign(
    { _id: user._id.toHexString(), access },
    process.env.JWT_SECRET
  ).toString();
  
  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  })
}


UserSchema.methods.removeToken = function(token){
  const user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}


// MONGOOSE MIDDLEWARE