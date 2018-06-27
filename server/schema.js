const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { todoMutations, todoQueries } = require("./todos");
const { userMutations, userQueries } = require("./users");

// Root schema to loads other queries and mutations in app
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    fields: () => ({
      ...userQueries,
      ...todoQueries
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutations",
    fields: () => ({
      ...userMutations,
      ...todoMutations
    })
  })
});
