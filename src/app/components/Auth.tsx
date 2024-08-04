import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Auth() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setUser(auth.currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <button onClick={logOut} className="bg-red-500 text-white p-2 rounded">Log Out</button>
      ) : (
        <button onClick={signIn} className="bg-green-500 text-white p-2 rounded">Sign In with Google</button>
      )}
    </div>
  );
}
