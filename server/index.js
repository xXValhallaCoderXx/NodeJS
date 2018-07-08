require("../config/index");

const express = require("express");
const logger = require("morgan");
const expressGraphQL = require("express-graphql");

const { mongoose } = require("./db");
const schema = require("./schema");
const cors = require('cors')
const app = express();

app.use(logger("dev"));

// Allow CORS - USING PACKAGE
app.use(cors())

// NOT WORKING - WHY??
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Sending in req / res as context to be avaiable in gql resolve functions
app.use("/gql", (req, res) => {
  return expressGraphQL({
    schema,
    graphiql: true,
    context: { req, res }
  })(req, res);
});

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});

module.exports = {
  app
};
