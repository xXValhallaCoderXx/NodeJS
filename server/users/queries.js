const graphql = require("graphql");
const { GraphQLList } = graphql;
const User = require("./model");
const UserType = require("./type");

const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find();
    }
  }
}

module.exports = userQueries;