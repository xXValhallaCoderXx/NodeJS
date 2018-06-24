// Env variables for Dev and Testing
require("../config/index");

const express = require("express");
const { mongoose } = require("./db");
const app = express();

// Application Middleware

// Application middleware for Dev / Testing
if(process.env.NODE_ENV !== "production"){
  const logger = require("morgan");

  app.use(logger("dev"));
}

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

// Define Application API Routes
const todoAPI = require("./todos/api");
const userAPI = require("./users/api");

app.use("/api", todoAPI);
app.use("/api", userAPI);

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});

module.exports = {
  app
};