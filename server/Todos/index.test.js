const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");

const Todo = require("../Todos/model");
const { User } = require("./model");
const { app } = require("../index");

const { todos, populateTodos, users } = require("../tests/seed");

beforeEach(populateTodos);

describe("POST /todos", () => {
  it("Should create a new todo", done => {
    const text = "This is testing";

    request(app)
      .post("/api/todos")
      .set("x-auth", users[0].tokens[0].token)
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

  it("Should not create todo with invalid body data", done => {
    request(app)
      .post("/api/todos")
      .set("x-auth", users[0].tokens[0].token)
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

describe("GET /todos", () => {
  it("Should get all todos", done => {
    request(app)
      .get("/api/todos")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        console.log("WHHHY ", res.body);
        expect(res.body.data.todos.length).toBe(1);
      })
      .end(done);
  });

  it("Should return a 404 if todo not found", done => {
    let newTodoID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${newTodoID}`)
      .set("x-auth", users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 for non object ID", done => {
    let newTodoID = "645654Ssdsdfsd";
    request(app)
      .get(`/todos/${newTodoID}`)
      .set("x-auth", users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it("Should get a TODO from a different user", done => {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set("x-auth", users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});


describe("DELETE /todos:id", () => {
  it("Should delete a todo", done => {
    const hexID = todos[1]._id.toHexString();
    request(app)
      .delete(`/api/todos/${hexID}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.data._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexID)
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });


  it("Should not delete another users todo", done => {
    const hexID = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexID)
          .then(todo => {
            expect(todo).toBeTruthy();
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });


  it("Should return a 404 on ID not found", done => {
    let newTodoID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${newTodoID}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 for non Object IDs", done => {
    let newTodoID = "645654Ssdsdfsd";
    request(app)
      .delete(`/todos/${newTodoID}`)
      .set('x-auth', users[1].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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

  it("Should not update the todo created by other users", done => {
    let hexID = todos[1]._id.toHexString();
    let dummyText = "This should be the new text";
    request(app)
      .patch(`/api/todos/${hexID}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: true,
        text: dummyText
      })
      .expect(404)
      .end(done);
  });

  it("Should clear completedAt when todo is not completed", done => {
    let hexID = todos[1]._id.toHexString();
    let dummyText = "This should be the new text";
    request(app)
      .patch(`/api/todos/${hexID}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: false,
        text: dummyText
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.text).toBe(dummyText);
        expect(res.body.data.completed).toBe(false);
        expect(res.body.data.completedAt).toBe(null);
      })
      .end(done);
    });
});
