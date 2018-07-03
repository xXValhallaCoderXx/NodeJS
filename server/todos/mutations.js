const graphql = require("graphql");
const { GraphQLString, GraphQLBoolean } = graphql;
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
  },
  deleteTodo: {
    type: TodoType,
    description: "AUTH: Delete todo of a logged in user",
    args: {
      id: { type: GraphQLString }
    },
    resolve(parentValue, { id }, context) {
      // TODO - This works but returns null - Need to fix
      return authenticate(context.req)
        .then(user => {
          Todo.findOneAndRemove({
            _id: id,
            _creator: user._id
          })
            .then(todo => {
              if (!todo || todo === null) {
                return new Error("Todo not found...");
              }
              return todo;
            })
            .catch(e => {
              return new Error("Error has occured...");
            });
        })
        .catch(err => {
          return new Error(err);
        });
    }
  },
  updateTodo: {
    type: TodoType,
    description: "AUTH: Update a todo of a logged in user",
    args: {
      id: { type: GraphQLString },
      text: { type: GraphQLString },
      completed: { type: GraphQLBoolean }
    },
    resolve(parentValue, { id, completed, text }, context) {
      // TODO - This works but returns null - Need to fix
      return authenticate(context.req)
        .then(user => {
          let completedAt;
          if (completed) {
            // getTime returns a JS Timestamp
            completedAt = new Date().getTime();
          } else {
            completed = false;
            completedAt = null;
          }

          Todo.findOneAndUpdate(
            {
              _id: id,
              _creator: user._id
            },
            {
              $set: {
                completedAt: completedAt,
                text,
                completed
              }
            },
            { new: true }
          )
            .then(todo => {
              if (!todo || todo === null) {
                return new Error("Todo not found...");
              }
              return todo;
            })
            .catch(e => {
              return new Error("Error has occured...");
            });
        })
        .catch(err => {
          return new Error(err);
        });
    }
  }
};

module.exports = todoMutations;
