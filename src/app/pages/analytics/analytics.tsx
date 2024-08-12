"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../firebase/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

interface UrlData {
  alias: string;
  originalUrl: string;
  clickCount: number;
}

const Analytics = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlCollection = collection(firestore, "urls");
      const urlSnapshot = await getDocs(urlCollection);
      const urlList = urlSnapshot.docs.map((doc) => doc.data() as UrlData);
      setUrls(urlList);
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center pt-60">
        <Image src="/Loading_icon.gif" width={200} height={100} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-purple-50  text-gray-700 px-4 py-4 sm:px-20  pt-24">
        <h2 className="font-bold text-2xl mb-6">Welcome onboard, {userName}</h2>
        <h2 className="font-bold text-2xl mb-6">User Analytics Dashboard</h2>
        <Link
          href={"/components/dashboard"}
          className=" hover:bg-purple-700 hover:text-gray-200 hover:rounded-lg hover:p-2"
        >
          Back
        </Link>
      </div>

      <div className="container p-10  text-gray-700 bg-purple-50">
        <table className="min-w-full bg-white border ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Alias</th>
              <th className="py-2 px-4 border-b">Original URL</th>
              <th className="py-2 px-4 border-b">Click Count</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{url.alias}</td>
                <td className="py-2 px-4 border-b">{url.originalUrl}</td>
                <td className="py-2 px-4 border-b">{url.clickCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
