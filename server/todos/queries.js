const graphql = require("graphql");
const { GraphQLList, GraphQLString } = graphql;
const TodoType = require("../todos/type");
const Todo = require("../todos/model");
const { authenticate } = require("../utils/auth");

const todoQueries = {
  todos: {
    type: new GraphQLList(TodoType),
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
          console.log("Error: ", err);
          return new Error("Invalid Token...");
        });
    }
  },
  todo: {
    type: TodoType,
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
          console.log("Auth Error: ", err);
          return new Error("Error occured");
        });
    }
  }
};

module.exports = todoQueries;
