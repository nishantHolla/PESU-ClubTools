import { auth } from "../../lib/firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

  return (
    <SessionContext.Provider
      value={{ user, loginEmail, loginGoogle, signup, logout, loading }}
    >
      {loading ? <Loading /> : children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
