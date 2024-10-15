const dotenv = require("dotenv");
dotenv.config();

const { app, port } = require("./app");
const serviceAccount = require(process.env.FIREBASE_ADMIN_KEY_PATH);

require("./v1");

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
