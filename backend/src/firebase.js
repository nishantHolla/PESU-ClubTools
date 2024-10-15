const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_ADMIN_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { authenticate };
