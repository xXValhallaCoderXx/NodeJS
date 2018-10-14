import { Router, Request, Response } from "express";
import bodyParser from "body-parser";

const router = Router();
const Todo = require("./model");

router.use(bodyParser.json());

// GET -- List of all Todos
router.get("/todos", (req: Request, res: Response) => {
  Todo.find()
    .then((todos: any) => {
      console.log("TODOS ", todos);
      return res.status(200).send({ success: true, data: todos });
    })
    .catch((e: any) => {
      return res.status(400).send({ success: false, data: null });
    });
});

// GET -- Get a specific Todo via ID

router.get("/todos/:id", (req: Request, res: Response) => {
  const id = req.params.id;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               // }
  Todo.findById(id)
    .then((todo: any) => {
      if (!todo) {
        return res
          .status(404)
          .send({ success: false, data: "Todo not found!" });
      }
      return res.status(200).send({ success: true, data: todo });
    })
    .catch((e: any) => {
      return res.status(400).send({ success: false, data: null });
    });
});

// POST - Create a new Todo

router.post("/todos", (req: Request, res: Response) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then((doc: any) => {
      return res.status(200).send({ success: true, data: doc });
    })
    .catch((e: any) => {
      return res.status(400).send({ success: false, data: null });
    });
});



router.delete("/todos/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  Todo.findOneAndRemove({ _id: id })
    .then((todo: any) => {
      if (!todo) {
        return res
          .status(404)
          .send({ success: false, data: "Todo not found!" });
      }
      return res.status(200).send({ success: true, data: todo });
    })
    .catch((e: any) => {
      return res.status(404).send({ success: false, data: null });
    });
});

router.patch("/todos/:id", (req: Request, res: Response) => {
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
    .then((todo: any) => {
      
      if (!todo) {
        return res
          .status(404)
          .send({ success: false, data: "Todo not found!" });
      }
      return res.status(200).send({ success: true, data: todo });
    })
    .catch((e: any) => {
      console.log("ERROR: ", e);
      return res.status(400).send({ success: false, data: null });
    });
});

// module.exports = router;
export const TodoController: Router = router;
