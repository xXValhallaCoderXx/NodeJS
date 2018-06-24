const { User } = require("../../users/model");

// Middleware
var authenticate = (req, res, next) => {
  var token = req.header("x-auth");
  // Create a model method
  User.findByToken(token)
    .then(user => {
      if (!user) {
        // return Promise.reject(); Also works
        return res.status(401).send("Not found");
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send({ success: false, data: "Auth is required" });
    });
};

module.exports = {
  authenticate
};
