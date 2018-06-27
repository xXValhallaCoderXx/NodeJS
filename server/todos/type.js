const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID
} = graphql;


const TodoType = new GraphQLObjectType({
  name: "TodoType",
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    completedAt:  { type: GraphQLInt }
  }
});

module.exports = TodoType;