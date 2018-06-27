const graphql = require("graphql");
const mongoose = require('mongoose');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;

const TodoType = require("../todos/type");
const Todo = mongoose.model('Todo');

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parentValue, args) {
        return Todo.findTodos(parentValue.id);
      }
    }
  }
});

module.exports = UserType;