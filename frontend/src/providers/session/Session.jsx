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
  const [loading, setLoading] = useState(true);

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
      }}
    >
      {loading ? <Loading /> : children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
