//connect node js and mongo db
const mongoose = require("mongoose");
const connectionString = process.env.DATABASE;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDb connection established");
  })
  .catch(() => {
    console.log("MongoDb connection error");
  });
