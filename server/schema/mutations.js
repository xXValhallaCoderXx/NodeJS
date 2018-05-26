const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = graphql;
const Todo = require("../Todos/model");
const TodoType = require("./todo_type");

const User = require("../Users/model");
const UserType = require("../Users/user_type");

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
    addUser: {
      type: UserType,
      description: "Add a new user",
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, {email, password}, req){
        console.log("WE ARE HEEHEHE")
        return "We must add user"
      }
    }
  }
})

module.exports = mutation;