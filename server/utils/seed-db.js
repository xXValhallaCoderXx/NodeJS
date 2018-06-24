require("../../config/index");

const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");
const { User } = require("../Users/model");
const Todo = require("../Todos/model");

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const todos = [
  { _id: new ObjectID(), text: "First todo", _creator: userOneID },
  { _id: new ObjectID(), text: "Second todo", completed: true, completedAt: 333, _creator: userTwoID }
];

const users = [
  {
    _id: userOneID,
    email: "test_user@email.com",
    password: "userOnePassword",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userOneID, access: "auth" }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userTwoID,
    email: "test_user2@email.com",
    password: "userTwoPassword",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userTwoID, access: "auth" }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  }
];

// Insert Many does not run Middleware
const populateUsers = done => {
  User.remove({})
    .then(() => {
      // We have 2 promises here
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      // Use  a promise util
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

const populateTodos = done => {
  console.log("WAHAHHAHAH")
  // Will only move to test case after done is called
  Todo.remove({}).then(() => {
    // Wipes the DB
    return Todo.insertMany(todos)
  }).then(() => done());
};

module.exports = {
  todos,
  users,
  populateUsers,
  populateTodos
};
