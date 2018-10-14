require("../config/index");

import express, {Application, Request, Response, NextFunction} from "express";
const logger = require("morgan");

const { mongoose  } = require("./db");

const app: Application = express();

app.use(logger("dev"));

// Allow CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

import {TodoController} from "./Todos/api";

app.use("/api", TodoController);

app.listen(process.env.PORT, () => {
  console.log("Mode: ", process.env.NODE_ENV);
  console.log("Listening On Port: ", process.env.PORT);
});

module.exports = {
  app
};