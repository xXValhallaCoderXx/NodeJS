require("../config/index");

const express = require("express");
const logger = require("morgan");

const { mongoose } = require("./db");

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

const todoAPI = require("./Todos/api");

app.use("/api", todoAPI);

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});