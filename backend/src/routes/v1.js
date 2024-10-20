const express = require("express");
const multer = require("multer");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getTest,
  getUser,
  createUser,
  deleteUser,
  createProject,
  getProject,
  updateProject,
  uploadImage,
} = require("../lib/db");

const upload = multer();

router.get("/ping", async (req, res) => {
  return res.status(200).json({ message: "Hello" });
});

router.get("/ping/db", async (req, res) => {
  console.log("ok");
  const data = await getTest();
  return res.status(200).json({ message: "ok", data });
});

router.get("/users/:uid", auth, async (req, res) => {
  if (req.user?.user_id !== req.params.uid) {
    return res
      .status(401)
      .json({ message: "Unauthorized (uid mismatched)", data: null });
  }

  const data = await getUser(req.user.user_id);
  return res.status(200).json({ message: "ok", data });
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

router.post("/project", auth, async (req, res) => {
  const result = await createProject(req.user.user_id);
  return res.status(200).json({ message: "ok", data: result });
});

router.post("/project/:projectid", auth, async (req, res) => {
  const project = await getProject(req.params.projectid);
  if (!project) {
    return res.status(404).json({ message: "Project not found", data: null });
  }

  if (project.userid !== req.user.user_id) {
    return res.status(401).json({
      message: "Unauthorized (uid does not match project owner)",
      data: null,
    });
  }

  const update = req.body.project;
  if (!update) {
    return res.status(400).json({ message: "Update not found", data: null });
  }

  const result = updateProject(update);
  return res.status(200).json({ message: "ok", data: result });
});

router.post(
  "/project/:projectid/image",
  auth,
  upload.single("image"),
  async (req, res) => {
    const project = await getProject(req.params.projectid);
    if (!project) {
      return res.status(404).json({ message: "Project not found", data: null });
    }

    if (project.userid !== req.user.user_id) {
      return res.status(401).json({
        message: "Unauthorized (uid does not match project owner)",
        data: null,
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded", data: null });
    }

    const result = uploadImage(project, req.file.buffer);
    return res.status(200).json({ message: "ok", data: result });
  },
);

module.exports = router;
