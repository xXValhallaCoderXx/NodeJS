const { User } = require("../users");

// Middleware
const authenticate = req => {
  return new Promise((resolve, reject) => {
    var token = req.header("x-auth");

    // Create a model method
    User.findByToken(token)
      .then(user => {
        if (!user) {
          reject("Error: User not found");
        }
        req.user = user;
        req.token = token;
        resolve(user);
      })
      .catch(() => {
        reject("Error occured authenticating user...");
      });
  });
};

module.exports = {
  authenticate
};
