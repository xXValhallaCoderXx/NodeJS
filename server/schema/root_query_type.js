const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList } = graphql;
const TodoType = require('./todo_type');
const Todo = require("../Todos/model");

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return Todo.find();
      }
    }
  })
});

module.exports = RootQuery;