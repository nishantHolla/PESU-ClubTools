const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

function run(port, database) {
  /* All collections in database */

  const userCollection = database.collection("users");
  const projectCollection = database.collection("projects");

  /* General routes*/

  app.get("/api/v1/ping", (_, res) => {
    return res.status(200).json({ result: "Ping!" });
  });

  /* User routes*/

  // get user
  app.get("/api/v1/user/:email", async (req, res) => {
    if (!req.params.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    try {
      const query = await userCollection.findOne(
        { email: req.params.email.toLowerCase() },
        { projection: { createdAt: 0 } },
      );

      const uid = query["_id"];
      query["_id"] = undefined;
      const projects = await projectCollection.find({ author: uid }).toArray();

      if (!query) {
        return res.status(404).json({ message: "User does not exist" });
      }

      return res
        .status(200)
        .json({ message: "Found user", result: { user: query, projects } });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // create new user in database
  app.post("/api/v1/user", async (req, res) => {
    if (!req.body.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    if (!req.body.name) {
      return res.status(400).json({ message: "User name not provided" });
    }

    try {
      const query = await userCollection.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (query) {
        return res.status(400).json({ message: "User already exists" });
      }

      await userCollection.insertOne({
        email: req.body.email,
        name: req.body.name,
        createdAt: Date.now(),
      });

      return res.status(200).json({ message: "Created new user", result: {} });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // delete user in databasae
  app.delete("/api/v1/user/:email", async (req, res) => {
    if (!req.params.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    try {
      const query = await userCollection.findOne({
        email: req.params.email.toLowerCase(),
      });
      if (!query) {
        return res.status(404).json({ message: "User does not exist" });
      }

      await userCollection.deleteOne({
        email: req.params.email,
      });

      return res.status(200).json({ message: "Deleted user", result: {} });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  /* Projects routes */
  app.post("/api/v1/project", async (req, res) => {
    if (!req.body.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    try {
      const user = await userCollection.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const project = {
        author: new ObjectId(user["_id"]),
        name: "Untitled project",
        csv: "",
        emailBody: "",
        emailSubject: "",
        status: [],
        coords: [],
        createdAt: Date.now(),
        qr: null,
        image: null,
      };

      await projectCollection.insertOne(project);
      return res
        .status(200)
        .json({ message: "Created new project", result: project });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  /* Certificate routes */

  /* Server actions */

  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
}

module.exports = { run };
