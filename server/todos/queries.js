const graphql = require("graphql");
const { GraphQLList, GraphQLString } = graphql;
const TodoType = require("../todos/type");
const Todo = require("../todos/model");
const { authenticate } = require("../utils/auth");

const todoQueries = {
  todos: {
    type: new GraphQLList(TodoType),
    description: "AUTH: Get all todos of logged in user",
    resolve(parentValue, {}, context) {
      return authenticate(context.req)
        .then(user => {
          // We now have current user - Search and return their Todos
          return Todo.find({ _creator: user._id })
            .then(todos => {
              return todos;
            })
            .catch(err => {
              return new Error("Error occured");
            });
        })
        .catch(err => {
          return new Error(err);
        });
    }
  },
  todo: {
    type: TodoType,
    description: "AUTH: Get a todo for logged in user",
    args: {
      id: { type: GraphQLString }
    },
    resolve(parentValue, { id }, context) {
      return authenticate(context.req)
        .then(user => {
          return Todo.find({ _id: id })
            .then(todo => {
              return todo[0];
            })
            .catch(err => {
              return new Error("Invalid ID...");
            });
        })
        .catch(err => {
          return new Error(err);
        });
    }
  }
};

module.exports = todoQueries;
