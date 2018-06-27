const mongoose = require("mongoose");
const User = mongoose.model("User");

function signup({ email, password, context }) {
  var user = new User({ email, password });

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error("This email can not be used...");
      }
      return user.save();
    })
    .then(user => {
      return user.generateAuthToken();
    })
    .then(user => {
      //todo:  Change it to use the last Token
      context.res.header("x-auth", user.tokens[0].token);
      return user;
    });
}

function login({ email, password, context }) {
  return User.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        //todo:  Change it to use the last Token
        context.res.header("x-auth", user.tokens[0].token);
        return user;
      });
    })
    .catch(e => {
      console.log("Error Login: ", e);
      throw new Error("Error Occured Logging In");
    });
}

function logout({context}){
  // req.user.removeToken(req.token).then(() => {
  //   res.status(200).send();
  // }, () => {
  //   res.status(400).send();
  // })
}

module.exports = { signup, login };
