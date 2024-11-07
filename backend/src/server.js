const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");
const { run } = require("./app");

const mongodb_uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

MongoClient.connect(mongodb_uri)
  .then((client) => {
    const database = client.db("clubtools");
    run(port, database);
  })
  .catch((e) => {
    console.log("Failed to connect to database: ", error);
  });
