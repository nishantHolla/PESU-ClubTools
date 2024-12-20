const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { send } = require("./workers");
const { auth } = require("./firebase");
const sanitizeHtml = require("sanitize-html");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

function run(port, database) {
  /* All collections in database */

  const userCollection = database.collection("users");
  const projectCollection = database.collection("projects");
  const certificateCollection = database.collection("certificates");

  /* General routes*/

  app.get("/api/v1/ping", (_, res) => {
    return res.status(200).json({ result: "Ping!" });
  });

  /* User routes*/

  // get user
  app.get("/api/v1/user/:email", auth, async (req, res) => {
    if (!req.params.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    if (req.params.email.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(400).json({ message: "Unauthorized action" });
    }

    try {
      const query = await userCollection.findOne(
        { email: req.params.email.toLowerCase() },
        { projection: { createdAt: 0 } },
      );

      if (!query) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const uid = query["_id"];
      query["_id"] = undefined;
      const projects = await projectCollection.find({ author: uid }).toArray();

      return res
        .status(200)
        .json({ message: "Found user", result: { user: query, projects } });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // create new user in database
  app.post("/api/v1/user", auth, async (req, res) => {
    if (!req.body.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    if (req.body.email.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(401).json({ message: "Unauthorized action" });
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
  app.delete("/api/v1/user/:email", auth, async (req, res) => {
    if (!req.params.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    if (req.params.email.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(401).json({ message: "Unauthorized action" });
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

  // creante new project in database
  app.post("/api/v1/project", auth, async (req, res) => {
    if (!req.body.email) {
      return res.status(400).json({ message: "User email id not provided" });
    }

    if (req.body.email.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(401).json({ message: "Unauthorized action" });
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

  // update project
  app.post("/api/v1/project/:projectid", auth, async (req, res) => {
    try {
      if (!req.params.projectid) {
        return res.status(400).json({ message: "No project id specified" });
      }

      if (!req.body) {
        return res.status(400).json({ message: "No updated specified" });
      }

      const existingProject = await projectCollection.findOne({
        _id: new ObjectId(req.params.projectid),
      });

      const author = await userCollection.findOne({
        _id: existingProject.author,
      });

      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      if (author.email.toLowerCase() !== req.user.email) {
        return res.status(401).json({ message: "Unauthorized action" });
      }

      if (!existingProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (req.body.emailBody) {
        req.body.emailBody = sanitizeHtml(req.body.emailBody, {
          allowedAttributes: false,
        });
      }

      if (req.body.emailSubject) {
        req.body.emailSubject = sanitizeHtml(req.body.emailSubject);
      }

      const updateData = Object.keys(req.body).reduce((acc, key) => {
        if (existingProject.hasOwnProperty(key)) {
          acc[key] = req.body[key];
        }
        return acc;
      }, {});

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }

      await projectCollection.updateOne(
        { _id: new ObjectId(req.params.projectid) },
        { $set: updateData },
      );

      return res.status(200).json({ message: "Project updated", result: {} });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // upload template image for a project
  app.post(
    "/api/v1/template/:projectid",
    auth,
    upload.single("image"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        const imageBinary = req.file.buffer;
        const projectid = req.params.projectid;

        if (!projectid) {
          return res.status(400).json({ message: "No project id specified" });
        }

        const project = await projectCollection.findOne({
          _id: new ObjectId(projectid),
        });

        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }

        const author = await userCollection.findOne({ _id: project.author });

        if (!author) {
          return res.status(404).json({ message: "Project author not found" });
        }

        if (author.email.toLowerCase() !== req.user.email.toLowerCase()) {
          return res.status(401).json({ message: "Unauthorized action" });
        }

        await projectCollection.updateOne(
          { _id: new ObjectId(projectid) },
          { $set: { image: imageBinary, contentType: req.file.mimetype } },
        );

        return res.status(200).json({ message: "Image uploaded", result: {} });
      } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  );

  // delete project
  app.delete("/api/v1/project/:projectid", auth, async (req, res) => {
    try {
      if (!req.params.projectid) {
        return res.status(400).json({ message: "No project id specified" });
      }

      const project = await projectCollection.findOne({
        _id: new ObjectId(req.params.projectid),
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const author = await userCollection.findOne({ _id: project.author });

      if (!author) {
        return res.status(404).json({ message: "Project author not found" });
      }

      if (author.email.toLowerCase() !== req.user.email.toLowerCase()) {
        return res.status(401).json({ message: "Unauthorized action" });
      }

      await projectCollection.deleteOne({
        _id: new ObjectId(req.params.projectid),
      });

      return res.status(200).json({ message: "Project deleted", result: {} });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  /* Certificate routes */
  app.get("/api/v1/verify/:certificateid", async (req, res) => {
    try {
      if (!req.params.certificateid) {
        return res.status(400).json({ message: "No certificate id specified" });
      }

      const certificate = await certificateCollection.findOne({
        _id: new ObjectId(req.params.certificateid),
      });

      if (!certificate) {
        return res
          .status(404)
          .json({ message: "Certificate not found", result: {} });
      }

      return res.status(200).json({
        message: "Certificate found",
        result: { name: certificate.name, createdAt: certificate.createdAt },
      });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // send cetificates
  app.post("/api/v1/send/:projectid", auth, async (req, res) => {
    try {
      if (!req.params.projectid) {
        return res.status(400).json({ message: "No project id specified" });
      }

      const project = await projectCollection.findOne({
        _id: new ObjectId(req.params.projectid),
      });

      if (!project) {
        return res
          .status(404)
          .json({ message: "Project does not exist", result: {} });
      }

      const author = await userCollection.findOne({ _id: project.author });

      if (!author) {
        return res.status(404).json({ message: "Project author not found" })
      }

      if (author.email.toLowerCase() !== req.user.email.toLowerCase()) {
        return res.status(401).json({ message: "Unauthorized action" })
      }

      const err = await send(project, certificateCollection);

      if (err) {
        return res.status(500).json({ message: err, result: {} });
      }

      return res.status(200).json({ message: "Project sent", result: {} });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // get status
  app.get("/api/v1/status/:projectid", auth, async (req, res) => {
    try {
      if (!req.params.projectid) {
        return res.status(400).json({ message: "No project id specified" });
      }

      const project = await projectCollection.findOne({
        _id: new ObjectId(req.params.projectid),
      });

      if (!project) {
        return res
          .status(404)
          .json({ message: "Project does not exist", result: {} });
      }

      const author = await userCollection.findOne({ _id: project.author })

      if (!author) {
        return res.status(404).json({ message: "Project author not found" })
      }

      if (author.email.toLowerCase() !== req.user.email.toLowerCase()) {
        return res.status(401).json({ message: "Unauthorized action" })
      }

      const certificates = await certificateCollection
        .find({
          projectid: new ObjectId(req.params.projectid),
        })
        .toArray();

      return res
        .status(200)
        .json({ message: "Certificate status found", result: certificates });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  /* Server actions */

  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
}

module.exports = { run };
