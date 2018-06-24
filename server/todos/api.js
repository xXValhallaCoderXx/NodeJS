const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const { authenticate } = require("../utils/middleware/auth");

const Todo = require("./model");

router.use(bodyParser.json());

// Authenticate middleware - Will get user object to add data into the request

// GET -- List of all Todos OF logged in user
router.get("/todos", authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => {
      return res.status(200).send({ success: true, data: {todos} });
    })
    .catch(e => {
      return res.status(400).send({ success: false, data: null });
    });
});

// GET -- Get a specific Todo via ID
router.get("/todos/:id", authenticate, (req, res) => {
  const id = req.params.id;
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res
          .status(404)
          .send({ success: false, data: "Todo not found!" });
      }
      return res.status(200).send({ success: true, data: todo });
    })
    .catch(e => {
      return res.status(400).send({ success: false, data: null });
    });
});

// POST - Create a new Todo under specific logged in user
router.post("/todos", authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    // The authenticate middleare will get the user object
    _creator: req.user._id
  });
  todo
    .save()
    .then(doc => {
      return res.status(200).send({ success: true, data: doc });
    })
    .catch(e => {
      return res.status(400).send({ success: false, data: null });
    });
});

router.delete("/todos/:id", authenticate, (req, res) => {
  const id = req.params.id;
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res
          .status(404)
          .send({ success: false, data: "Todo not found!" });
      }
      return res.status(200).send({ success: true, data: todo });
    })
    .catch(e => {
      return res.status(404).send({ success: false, data: null });
    });
});

router.patch("/todos/:id", authenticate, (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  let completed = req.body.completed;

  let completedAt;
  if (completed) {
    // getTime returns a JS Timestamp
    completedAt = new Date().getTime();
  } else {
    completed = false;
    completedAt = null;
  }

  Todo.findOneAndUpdate(
    {
      _id: id,
      _creator: req.user._id
    },
    {
      $set: {
        completedAt: completedAt,
        text,
        completed
      }
    },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res
          .status(404)
          .send({ success: false, data: "Todo not found!" });
      }
      return res.status(200).send({ success: true, data: todo });
    })
    .catch(e => {
      return res.status(400).send({ success: false, data: null });
    });
});

module.exports = router;
