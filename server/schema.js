const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { todoMutations, todoQueries } = require("./todos");
const { userMutations, userQueries } = require("./users");

// Root schema to loads other queries and mutations in app
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    description: `Queries here will search the in request header for a value called "x-auth" which should have a token acquired when you create or login a user.`,
    fields: () => ({
      ...userQueries,
      ...todoQueries
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutations",
    description: `When you "signup" or "login" user the reponse from the GQL call will have an "x-auth" token which can be used to identify the user on authenticated routes, "addTodo" is an authenticated route`,
    fields: () => ({
      ...userMutations,
      ...todoMutations
    })
  })
});
