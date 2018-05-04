const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Todo = require("./model");

router.use(bodyParser.json());

router.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      return res.status(200).send({ success: true, data: todos });
    })
    .catch(e => {
      return res.status(400).send({ success: false, data: null });
    });
});

router.post("/todo/add", (req, res) => {
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

router.get("/todo/:id", (req, res) => {
  const id = req.params.id;

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

router.delete("/todo/delete/:id", (req, res) => {
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
      return res.status(400).send({ success: false, data: null });
    });
});

router.post("/todo/update", (req, res) => {
  const id = req.body.id;
  const text = req.body.text;

  Todo.findByIdAndUpdate(
    { _id: id },
    {
      $set: { text: text }
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
