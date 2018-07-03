const graphql = require("graphql");
const { GraphQLString } = graphql;
const Todo = require("../todos/model");
const TodoType = require("../todos/type");
const { authenticate } = require("../utils/auth");

const todoMutations = {
  addTodo: {
    type: TodoType,
    description: "AUTH: Add new todo for logged in user",
    args: {
      text: { type: GraphQLString }
    },
    resolve(parentValue, { text }, context) {
      return authenticate(context.req)
        .then(user => {
          return new Todo({ text, _creator: user._id }).save();
        })
        .catch(err => {
          return new Error(err);
        });
    }
  }
};

module.exports = todoMutations;
