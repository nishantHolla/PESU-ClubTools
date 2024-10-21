import { auth } from "../../lib/firebase";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import {base64ToFile} from "../../lib/utils";
>>>>>>> parent of 0f89069 (Add data uploading)
=======
>>>>>>> parent of 5a09ac4 (Add template uploading)
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
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const [userData, setUserData] = useState(null);

  const queryUserData = async (currentUser) => {
    if (userData) {
      console.log("User data present");
      return;
    }

    const sessionUserData = JSON.parse(sessionStorage.getItem("user-data"));
    if (sessionUserData) {
      console.log("User data restored from session");
      setUserData(sessionUserData);
      return;
    }

    try {
      let foundUser = false;

      await getUser(currentUser, (res) => {
        if (!res.data) return;
        setUserData(res.data);
        sessionStorage.setItem("user-data", JSON.stringify(res.data));
        foundUser = true;
      });

      if (!foundUser) {
        await createUser(currentUser, (res) => {
          sessionStorage.setItem("user-data", JSON.stringify(res.data));
          setUserData(res.data);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
>>>>>>> parent of 0f89069 (Add data uploading)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginEmail = async (email, password, cb, err) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cb) cb(cred.user);
    } catch (e) {
      if (err) err(e);
    }
  };

  const loginGoogle = async (cb, err) => {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      if (cb) cb(cred.user);
    } catch (e) {
      if (err) err(e);
    }
  };

  const signup = async (email, password, name, cb, err) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      if (cb) cb(cred.user);
    } catch (e) {
      if (err) err(e);
    }
  };

  const logout = async (cb, err) => {
    try {
      await signOut(auth);
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

      await user.delete();
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

<<<<<<< HEAD
=======
  const addProject = (project) => {
    const u = userData;
    u.projects.push(project.data);
    setUserData(u);
    sessionStorage.setItem("user-data", JSON.stringify(u));
  };

<<<<<<< HEAD
  const updateProject = async (project) => {
    const u = userData.projects.map((p) => {
      if (p.projectid !== project.projectid) return p;

      return project;
    });
    setUserData({ ...userData, projects: u });
    sessionStorage.setItem("user-data", JSON.stringify(u));
  };

>>>>>>> parent of 0f89069 (Add data uploading)
=======
>>>>>>> parent of 7d9838d (Add project editing)
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
<<<<<<< HEAD
=======
        userData,
        addProject,
>>>>>>> parent of 7d9838d (Add project editing)
      }}
    >
      {loading ? <Loading /> : children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
