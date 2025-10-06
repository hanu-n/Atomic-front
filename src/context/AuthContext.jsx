import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
// import { isUserVerified } from '../utils/authUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser, true);
        setCurrentUser({
          ...firebaseUser,
          token,
        });
        // Check backend verification status
        try {
          const res = await fetch(`http://localhost:5000/api/users/is-verified/${firebaseUser.uid}`);
          const data = await res.json();
          setIsVerified(!!data.isVerified);
        } catch (err) {
          setIsVerified(false);
        }
      } else {
        setCurrentUser(null);
        setIsVerified(false);
      }
      setLoading(false);
    });
    return () => unSub();
  }, []);

  const logout = () => signOut(auth);

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const token = await getIdToken(auth.currentUser, true);
      setCurrentUser({ ...auth.currentUser, token });
      // Check backend verification status
      try {
        const res = await fetch(`http://localhost:5000/api/users/is-verified/${auth.currentUser.uid}`);
        const data = await res.json();
        setIsVerified(!!data.isVerified);
      } catch (err) {
        setIsVerified(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        loading,
        isVerified,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
