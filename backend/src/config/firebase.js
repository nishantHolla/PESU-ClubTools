const dotenv = require('dotenv')
dotenv.config()
const admin = require("firebase-admin");
// const serviceAccount = require("/etc/secrets/firebase-service-account.json");
const serviceAccount = require(process.env.FIREBASE_ADMIN_PATH)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
