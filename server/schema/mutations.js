const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = graphql;
const Todo = require("../Todos/model");
const TodoType = require("./todo_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      description: "Add a new todo",
      args: {
        text: { type: GraphQLString }
      },
      resolve(parentValue, {text}, req){
        return (new Todo({ text })).save();
      }
    },
  }
})

module.exports = mutation;