const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getTest, getUser, createUser, deleteUser } = require("../lib/db");

router.get("/ping", async (req, res) => {
  return res.status(200).json({ message: "Hello" });
});

router.get("/ping/db", async (req, res) => {
  console.log('ok')
  const data = await getTest();
  return res.status(200).json({ message: "ok", data });
});

router.get("/users/:uid", auth, async (req, res) => {
  if (req.user?.user_id !== req.params.uid) {
    return res
      .status(401)
      .json({ message: "Unauthorized (uid mismatched)", data: null });
  }

  const user = await getUser(req.user.user_id);
  return res.status(200).json({ message: "ok", data: user });
});

router.post("/users", auth, async (req, res) => {
  if (req.user?.user_id !== req.body.uid) {
    return res
      .status(401)
      .json({ message: "Unauthorized (uid mismatched)", data: null });
  }

  const user = await getUser(req.body.uid);
  if (user) {
    return res.status(400).json({ message: "User exists", data: null });
  }
  const ack = await createUser(req.body.uid);
  return res.status(200).json({ message: "ok", data: ack });
});

router.delete("/users", auth, async (req, res) => {
  if (req.user?.user_id !== req.body.uid) {
    return res
      .status(401)
      .json({ message: "Unauthorized (uid mismatched)", data: null });
  }

  const result = await deleteUser(req.body.uid);
  return res.status(200).json({ message: "ok", data: result });
});

module.exports = router;
