const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const User = require("./model");
const UserType = require("./type");
const AuthService = require("./auth");

const userMutations = {
  signup: {
    type: UserType,
    description: "Add new user",
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(parentValue, { email, password }, context) {
      return AuthService.signup({ email, password, context });
    }
  },
  login: {
    type: UserType,
    description: "Authenticate user",
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(parentValue, { email, password }, context){
      return AuthService.login({email, password, context});
    }
  },
  logout: {
    type: UserType,
    description: "Logout user", 
    resolve(parentValue, {}, context){
      return "WIP"
    }
  }
};

module.exports = userMutations;
