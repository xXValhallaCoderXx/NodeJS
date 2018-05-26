const mongoose = require("mongoose");


if (![process.env.MONGODB_URI]) {
  throw new Error('You must provide a MongoDB URI');
}

//Tell Mongoose which promise library to use

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoDB:', error));

module.exports = {
  mongoose
};