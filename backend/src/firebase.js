const dotenv = require("dotenv");
dotenv.config();

const { initializeApp } = require("firebase-admin/app");

var serviceAccount = require(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY_FILE_PATH,
);

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  const idToken = authorizationHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { auth };
