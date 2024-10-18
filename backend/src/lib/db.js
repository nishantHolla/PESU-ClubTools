const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db("clubtools");
const users = database.collection("users");
const test = database.collection("test");

async function getUser(uid) {
  try {
    const user = await users.findOne({ uid }, { uid: 1, projectids: 1 });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getTest() {
  try {
    const data = await test.findOne({ uid: "test" });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function createUser(uid) {
  const user = { uid, projectids: [], createdAt: Date.now() };

  try {
    await users.insertOne(user);
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function deleteUser(uid) {
  try {
    await users.deleteOne({ uid });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = { getTest, getUser, createUser, deleteUser };
