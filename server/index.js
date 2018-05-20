require("../config/index");

const express = require("express");
const logger = require("morgan");
const expressGraphQL = require('express-graphql');

const { mongoose } = require("./db");
const schema = require('./schema');

const app = express();
app.use(logger("dev"));

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});

module.exports = {
  app
};