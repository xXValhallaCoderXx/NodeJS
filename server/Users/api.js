const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bodyParser = require("body-parser");

const { authenticate } = require("../utils/middleware/auth");

const {User} = require("./model");

router.use(bodyParser.json());


router.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);
  user.save().then(() => {
    
    if(!user){
      return res.status(400).send("Something wrong")
    }
    return user.generateAuthToken();
  }).then(token => {
    // Prefix with x- is a customer header
    res.header('x-auth', token).send(user);
  }).catch(e => {
    return res.status(400).send(e)
  })
});

router.post("/users/login", (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then(user => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(e => {
    res.status(400).send();
  });
})

router.delete("/users/me/token", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
});

module.exports = router;