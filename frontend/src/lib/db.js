import axios from "axios";
import { auth } from "./firebase";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function testDb(cb, err) {
  try {
    const response = await axios({
      method: "get",
      url: `${BACKEND_URL}/api/v1/ping/db`,
    });
    console.log(response.data);
    if (cb) cb(response.data);
  } catch (e) {
    console.log(err);
    if (err) err(e);
  }
}

async function getUser(user, cb, err) {
  try {
    if (!user) return;
    const token = await user.getIdToken();

    const response = await axios({
      method: "get",
      url: `${BACKEND_URL}/api/v1/users/${user.uid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response);
    }

    if (cb) cb(response.data);
  } catch (e) {
    if (err) err(e.response.data);
  }
}

async function createUser(user, cb, err) {
  try {
    if (!user) return;
    const token = await user.getIdToken();
    const response = await axios({
      method: "post",
      url: `${BACKEND_URL}/api/v1/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        uid: user.uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(response);
    }

    if (cb) cb(response.data);
  } catch (e) {
    if (err) err(e.response.data);
  }
}

async function deleteUser(cb, err) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const response = await axios({
      method: "delete",
      url: `${BACKEND_URL}/api/v1/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        uid: user.uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(response);
    }

    if (cb) cb(response.data);
  } catch (e) {
    if (err) err(e.response.data);
  }
}

async function createProject(cb, err) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const response = await axios({
      method: "post",
      url: `${BACKEND_URL}/api/v1/project`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response);
    }
    if (cb) cb(response.data);
  } catch (e) {
    if (err) err(e.response.data);
  }
}

async function updateProject(project, cb, err) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const response = await axios({
      method: "post",
      url: `${BACKEND_URL}/api/v1/project/${project.projectid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        project,
      },
    });

    if (response.status !== 200) {
      throw new Error(response);
    }

    if (cb) cb(response.data);
  } catch (e) {
    if (err) err(e.response.data);
  }
}

export {
  getUser,
  createUser,
  deleteUser,
  testDb,
  createProject,
  updateProject,
};
