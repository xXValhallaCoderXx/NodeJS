const graphql = require("graphql");
const { GraphQLString } = graphql;
const Todo = require("../todos/model");
const TodoType = require("../todos/type");
const { authenticate } = require("../utils/auth");

const todoMutations = {
  addTodo: {
    type: TodoType,
    description: "Add a new todo",
    args: {
      text: { type: GraphQLString }
    },
    resolve(parentValue, { text }, context) {
      return authenticate(context.req)
        .then(user => {
          return new Todo({ text, _creator: user._id }).save();
        })
        .catch(err => {
          console.log("Error: ", err);
          return new Error("Invalid Token...");
        });
    }
  }
};

module.exports = todoMutations;
