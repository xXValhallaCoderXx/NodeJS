require("../config/index");

const express = require("express");
const logger = require("morgan");

const { mongoose } = require("./db");

const app = express();

app.use(logger("dev"));

// Allow CORS
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const todoAPI = require("./Todos/api");
const userAPI = require("./Users/api");

app.use("/api", todoAPI);
app.use("/api", userAPI);

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});

module.exports = {
  app
};