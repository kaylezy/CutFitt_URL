"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [appSetting, setAppSetting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) {
        router.push("/login");
        return;
      }

      const userRef = doc(firestore, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUsername(userData.username || "");
        setAppSetting(userData.appSetting || false);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      const userRef = doc(firestore, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        username,
        appSetting,
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-10 pt-40 bg-purple-50">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          title="Username"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          App Setting
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={appSetting}
            onChange={(e) => setAppSetting(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            title="App Setting"
          />
          <span className="ml-2 text-gray-700">Enable Feature X</span>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 rounded-full bg-purple-700 text-white hover:bg-purple-600 active:scale-90 font-medium py-2 px-8 transition duration-300"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
