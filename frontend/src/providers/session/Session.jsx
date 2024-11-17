import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import { auth } from "../../lib/firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  EmailAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import Loading from "../../components/Loading/Loading";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const projects = localStorage.getItem("projects");
      if (projects) {
        setProjects(JSON.parse(projects));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const loginEmail = async (email, password, cb, err) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/${cred.user.email}`,
        );
        setProjects(response.data.result.projects);
        localStorage.setItem(
          "projects",
          JSON.stringify(response.data.result.projects),
        );
        if (cb) cb(cred.user);
      } catch (e) {
        if (e.status === 404) {
          // try {
          //   await axios.post(`${BACKEND_URL}/api/v1/user`, {
          //     email: cred.user.email,
          //     name: cred.user.displayName,
          //   });
          //   if (cb) cb(cred.user);
          // } catch (e) {
          //   if (err) err(e);
          // }
        }
      }
    } catch (e) {
      if (err) err(e);
    }
  };

  const loginGoogle = async (cb, err) => {
    const provider = new GoogleAuthProvider();

    try {
      const cred = await signInWithPopup(auth, provider);

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/${cred.user.email}`,
        );
        setProjects(response.data.result.projects);
        localStorage.setItem(
          "projects",
          JSON.stringify(response.data.result.projects),
        );
        if (cb) cb(cred.user);
      } catch (e) {
        if (e.status === 404) {
          try {
            await axios.post(`${BACKEND_URL}/api/v1/user`, {
              email: cred.user.email,
              name: cred.user.displayName,
            });
            if (cb) cb(cred.user);
          } catch (e) {
            if (err) err(e);
          }
        }
      }
    } catch (e) {
      if (err) err(e);
    }
  };

  const signup = async (email, password, name, cb, err) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      try {
        await axios.post(`${BACKEND_URL}/api/v1/user`, {
          email: cred.user.email,
          name: name,
        });
        if (cb) cb(cred.user);
      } catch (e) {
        if (err) err(e);
        return;
      }

      if (cb) cb(cred.user);
    } catch (e) {
      if (err) err(e);
    }
  };

  const logout = async (cb, err) => {
    try {
      await signOut(auth);
      localStorage.removeItem("projects");
      if (cb) cb();
    } catch (e) {
      if (err) err(e);
    }
  };

  const deleteAccount = async (password, cb, err) => {
    if (!user) return;

    try {
      const providerId = user.providerData[0]?.providerId;

      if (providerId === "password") {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      } else if (providerId === "google.com") {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          await reauthenticateWithCredential(user, credential);
        } else {
          throw new Error("No credentials");
        }
      }

      try {
        await axios.delete(`${BACKEND_URL}/api/v1/user/${user.email}`);
      } catch (e) {
        if (err) err(e);
        return;
      }
      await user.delete();
      localStorage.removeItem('projects')
      if (cb) cb();
    } catch (e) {
      if (err) err(e);
    }
  };

  const changePassword = async (oldPassword, newPassword, cb, err) => {
    if (!user) return;

    try {
      const providerId = user.providerData[0]?.providerId;
      if (providerId !== "password") return;
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      if (cb) cb();
    } catch (e) {
      if (err) err(e);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        loginEmail,
        loginGoogle,
        signup,
        logout,
        loading,
        deleteAccount,
        changePassword,
        projects,
        setProjects,
      }}
    >
      {loading ? <Loading /> : children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
