const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { ObjectID } = require('mongodb');

const Todo = require("./model");

router.use(bodyParser.json());

// GET -- List of all Todos
router.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      return res.status(200).send({ success: true, data: todos });
    })
    .catch(e => {
      return res.status(400).send({ success: false, data: null });
    });
});

// GET -- Get a specific Todo via ID

router.get("/todos/:id", (req, res) => {
  const id = req.params.id;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               // }
  Todo.findById(id)
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

// POST - Create a new Todo

router.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text
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



router.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  Todo.findOneAndRemove({ _id: id })
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

router.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  let completed = req.body.completed;

  let completedAt;
  if(completed){
    // getTime returns a JS Timestamp
    completedAt = new Date().getTime();
  } else {
    completed = false;
    completedAt = null;
  }

  Todo.findByIdAndUpdate(
    { _id: id },
    {
      $set: { 
        completedAt: completedAt,
        text, 
        completed }
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
      console.log("ERROR: ", e);
      return res.status(400).send({ success: false, data: null });
    });
});

module.exports = router;
