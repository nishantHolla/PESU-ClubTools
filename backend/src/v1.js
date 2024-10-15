const { app } = require("./app");
const { authenticate } = require("./firebase");

app.get("/ping", (_, res) => {
  return res.status(200).send({ message: "Hello" });
});

app.get("/api/v1/test", authenticate, (req, res) => {
  return res.status(200).send({ message: "Hello" });
});
