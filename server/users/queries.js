const graphql = require("graphql");
const { GraphQLList } = graphql;
const User = require("./model");
const UserType = require("./type");
const { authenticate } = require("../utils/auth");

const userQueries = {
  // users: {
  //   type: new GraphQLList(UserType),
  //   resolve() {
  //     return User.find();
  //   }
  // },
  logout: {
    type: UserType,
    description: "Logout user",
    resolve(parentValue, { id }, context) {
      return authenticate(context.req)
        .then(user => {
          console.log("WHAT IS THIS USER: ", user);
          return "OKAY"
        })
        .catch(err => {
          return new Error(err);
        });
    }
  }
}



module.exports = userQueries;