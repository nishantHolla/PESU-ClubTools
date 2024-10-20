const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db("clubtools");

const usersCollection = database.collection("users");
const projectsCollection = database.collection("projects");
const testCollection = database.collection("test");

async function getTest() {
  try {
    const data = await testCollection.findOne({ uid: "test" });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getUser(uid) {
  try {
    const user = await usersCollection.findOne({ uid }, { uid: 1 });
    if (!user) return null;
    const projects = await projectsCollection.find({ userid: uid }).toArray();
    return { user, projects };
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function createUser(uid) {
  const user = { uid, createdAt: Date.now() };

  try {
    await usersCollection.insertOne(user);
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function deleteUser(uid) {
  try {
    await usersCollection.deleteOne({ uid });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function createProject(uid) {
  const id = uuidv4();
  const project = {
    projectid: id,
    userid: uid,
    name: "Untitled project",
    csv: "",
    emailBody: "",
    emailSubject: "",
    status: [],
    templateid: "",
    coords: [],
    createAt: Date.now(),
    qr: {},
    image: null,
  };

  try {
    await projectsCollection.insertOne(project);
    return project;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getProject(projectid) {
  try {
    const project = await projectsCollection.findOne({ projectid });
    return project;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function updateProject(project) {
  try {
    await projectsCollection.updateOne(
      { projectid: project.projectid },
      {
        $set: { name: project.name },
      },
    );
    return await getProject(project.projectid);
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function uploadImage(project, buffer) {
  try {
    return await projectsCollection.updateOne(
      { projectid: project.projectid },
      { $set: { image: buffer } },
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = {
  getTest,
  getUser,
  createUser,
  deleteUser,
  createProject,
  getProject,
  updateProject,
  uploadImage,
};
