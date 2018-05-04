const env = process.env.NODE_ENV;

// Depending on the enviroment, this will pull the values from the respective .json file and add the values as process.env variables

if (env === "dev" || env === "test") {
  let config = require("./config_dev.json");
  let envConfig = config[env];

  // Makes all object keys into an array
  Object.keys(envConfig).forEach(key => {
    // Creates ENV variables for all in the config file
    process.env[key] = envConfig[key];
  });
}