import mongoose from "mongoose";

//Tell Mongoose which promise library to use

mongoose.Promise = global.Promise;

if(process.env.MONGODB_URI !== undefined){
  mongoose.connect(process.env.MONGODB_URI);
}

module.exports = {
  mongoose
};