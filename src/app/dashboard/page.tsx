"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import UrlShortener from "../components/UrlShortener";
import Analytics from "../pages/analytics";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.userName}`);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      return error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center pt-60">
        <Image src="/Loading_icon.gif" width={200} height={100} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-purple-50 min-h-screen text-gray-700 px-4 py-4 sm:px-20 sm:py-20">
        <h1 className="font-bold text-2xl mb-10">Dashboard</h1>
        <main className="font-bold text-2xl mb-10">
          <h2>Welcome onboard, {userName}</h2>
        </main>
        <button
          className="bg-purple-800 text-white rounded-lg p-2 text-sm shadow-md hover:bg-gradient-to-b from-purple-300 to-purple-900 hover:shadow-lg transition-all disabled:to-purple-400 disabled:from-purple-400"
          onClick={handleSignOut}
        >
          Sign out
        </button>
        <UrlShortener />
        <Analytics />
      </div>
    </>
  );
}
