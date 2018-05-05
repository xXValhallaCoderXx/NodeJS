const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const Todo = require("./model");
const { app } = require("../index");

const todos = [
  { _id: new ObjectID(), text: "First todo" },
  {
    _id: new ObjectID(),
    text: "Second todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      // Wipes the DB
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("Should create a new todo", done => {
    const text = "This is testing";

    request(app)
      .post("/api/todos")
      .send({
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          // Test will fail on error
          // Return so we stop the execution of test
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(err => {
            // Catches any of the above errors
            done(err);
          });
      });
  });

  it("Should not created a Todo  - Invalid body data", done => {
    request(app)
      .post("/api/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

// DESCRIBE GET REQUESTS

describe("GET /todos", () => {
  it("Should get all todos", done => {
    request(app)
      .get("/api/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(2);
      })
      .end(done);
  });

  it("Should get a Todo", done => {
    request(app)
      .get(`/api/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.data.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("Should return a 404 if Todo not found", done => {
    const newTodoID = new ObjectID().toHexString();
    request(app)
      .get(`/api/todo/${newTodoID}`)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 for non object ID", done => {
    const newTodoID = "645654Ssdsdfsd";
    request(app)
      .get(`/todos/${newTodoID}`)
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos:id", () => {
  // it("Should delete a todo", done => {
  //   const hexID = todos[0]._id.toHexString();
  //   request(app)
  //     .delete(`api/todo/${hexID}`)
  //     .expect(200)
  //     .expect(res => {
  //       expect(res.body.data._id).toBe(hexID)
  //     })
  //     .end((err, res) => {
  //       if(err){
  //         console.log("WHAT IS ERROR: ", err);
  //         return done(err);
  //       }
  //       Todo.findById(hexID).then(todo => {
  //         expect(todo).toNotExist();
  //         done();
  //       }).catch(e => {
  //         done(e);
  //       })
  //     })
  // });

  it("Should return a 404 on ID not found", done => {
    let newTodoID = new ObjectID().toHexString();
    request(app)
      .delete(`/api/todo/${newTodoID}`)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 for non Object IDs", done => {
    let newTodoID = "645654Ssdsdfsx";
    request(app)
      .delete(`/api/todo/${newTodoID}`)
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("Should update the todo", done => {
    let hexID = todos[0]._id.toHexString();
    let dummyText = "This should be the new text";
    request(app)
      .patch(`/api/todos/${hexID}`)
      .send({
        completed: true,
        text: dummyText
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.text).toBe(dummyText);
        expect(res.body.data.completed).toBe(true);
        //expect(res.body.data.completedAt).toBeA("number");
      })
      .end(done);
  });

  // it("Should clear completedAt when todo is not completed", done => {
  //   let hexID = todos[1]._id.toHexString();
  //   let dummyText = "This should be the new text";
  //   request(app)
  //     .patch(`/todos/${hexID}`)
  //     .send({
  //       completed: false,
  //       text: dummyText
  //     })
  //     .expect(200)
  //     .expect(res => {
  //       expect(res.body.todo.text).toBe(dummyText);
  //       expect(res.body.todo.completed).toBe(false);
  //       expect(res.body.todo.completedAt).toNotExist();
  //     })
  //     .end(done);
  // });
});
