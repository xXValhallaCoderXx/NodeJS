const { User } = require("../Users/model");

// Middleware
var authenticate = (req, res, next) => {
  var token = req.header("x-auth");

  // Create a model method
  User.findByToken(token)
    .then(user => {
      if (!user) {
        console.log("User not found");
        // return Promise.reject(); Also works
        return res.status(401).send("Not found");
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      console.log("WHY E: ", e)
      res.status(401).send("Auth is required");
    });
};

module.exports = {
  authenticate
};
