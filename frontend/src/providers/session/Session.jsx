import { auth } from "../../lib/firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
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

  const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
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
