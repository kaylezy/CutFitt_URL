"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../../firebase/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import UrlShortener from "../UrlShortener/page";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { DiGoogleAnalytics } from "react-icons/di";
import { MdContentPasteGo } from "react-icons/md";

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
      <div className="bg-purple-50 md:flex  min-h-screen text-gray-700 px-4 py-4 sm:px-20 sm:py-24 pt-24">
        <main className="font-bold flex flex-col p-4 text-lg mb-8 md:mr-20 md:border-r rounded-lg border-purple-500 md:pr-4">
          <h1 className="font-bold text-2xl mb-8">Dashboard</h1>
          <h2 className="mb-6">Welcome onboard, {userName}</h2>
          <Link href={"/pages/profile"} className="flex items-center mb-6">
            <ImProfile className="mr-4" />
            Profile
          </Link>
          <Link href={"/pages/analytics"} className="flex items-center mb-6">
            <DiGoogleAnalytics className="mr-4" />
            Analytics
          </Link>
          <Link href={"/pages/content"} className="flex items-center mb-6">
            <MdContentPasteGo className="mr-4" />
            Create Content
          </Link>

          <div className="">
            <button
              className=" flex items-center text-lg text-red-500"
              onClick={handleSignOut}
            >
              <MdLogout className="mr-4" />
              Log Out
            </button>
          </div>
          <div className="hidden relative lg:flex h-full items-center justify-center ">
            <div className="w-20 h-20 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full animate-bounce" />
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
          </div>
        </main>
        <div className="w-full md:p-10 border border-purple-500 rounded-lg">
          <UrlShortener />
        </div>
      </div>
    </>
  );
}
