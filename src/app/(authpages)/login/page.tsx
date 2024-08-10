"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import {
//   GoogleSignInButton,
//   EmailSignInButton,
// } from "nextfirejs/client/components";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { googleAuthProvider } from "../../firebase/firebase";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);

      const user = userCredential.user;
      if (user.emailVerified) {
        //retrieve registration data from local storage

        const registrationData = localStorage.getItem("registrationData");
        const { userName = "", password = "" } = registrationData
          ? JSON.parse(registrationData)
          : {};

        //check if user exists in firestore database

        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "user", user.uid), {
            userName,
            password,
            email: user.email,
          });
        }
        router.push("/dashboard");
      } else {
        setError("Please verify your email address to continue");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user.emailVerified) {
        //retrieve registration data from local storage

        const registrationData = localStorage.getItem("registrationData");
        const { userName = "", password = "" } = registrationData
          ? JSON.parse(registrationData)
          : {};

        //check if user exists in firestore database

        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "user", user.uid), {
            userName,
            password,
            email: user.email,
          });
        }
        router.push("/components/dashboard");
      } else {
        setError("Please verify your email address to continue");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <div className="space-y-6 h-screen w-screen text-black flex justify-center items-center transition-all p-2 bg-purple-50  pt-24">
        <div className="max-w-md flex flex-col items-center justify-center shadow-lg border rounded-xl w-full bg-gray">
          <form
            onSubmit={handleSignin}
            className="flex flex-col border-b rounded-xl w-full  p-4 md:p-8 lg:p-10 py-10 bg-purple-500"
          >
            <h1 className="text-lg font-semibold text-center text-gray-300">
              Sign in{" "}
            </h1>
            <h2 className="text-sm mb-8 text-center text-gray-300">
              Sign in to access our Awesome New Tool
            </h2>

            <div className="relative flex flex-col w-full text-gray-300">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full py-2 pl-10 pr-4 p-1.5 rounded-md mb-2 border text-sm text-black focus:border-purple-400 focus:border-2 focus:outline-none"
                value={email}
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdEmail className="absolute pl-2 h-6 w-9 top-8 text-purple-900" />
            </div>

            <div className="relative flex flex-col w-full text-gray-300">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full py-2 pl-10 pr-4 p-1.5 rounded-md mb-2 border text-sm text-black focus:border-purple-400 focus:border-2 focus:outline-none"
                value={password}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <RiLockPasswordFill className="absolute pl-2 h-6 w-9 top-8 text-purple-900" />
            </div>

            {error != "" && (
              <span className="text-red-300 text-sm font-medium mb-2 w-full">
                {error}
              </span>
            )}

            <button
              // email={email}
              // password={password}
              // setErrorMessage={setError}
              // setLoading={setLoading}
              className="w-full mt-3 bg-purple-800 text-white rounded-lg p-2 text-sm shadow-md hover:bg-gradient-to-b from-purple-300 to-purple-900 hover:shadow-lg transition-all disabled:to-purple-400 disabled:from-purple-400"
              disabled={loading}
            >
              Sign In
            </button>

            <Link
              className="text-purple-200 mt-1 cursor-pointer font-medium text-right"
              href={"/forgot-password"}
            >
              Forgot Password
            </Link>

            <div className="flex flex-row mt-5 w-full items-center mb-8">
              <div className="w-1/2 h-[1px] bg-gray-300"></div>
              <p className="text-gray-400 text-sm font-normal mx-2">or</p>
              <div className="w-1/2 h-[1px] bg-gray-300"></div>
            </div>

            <button
              onClick={handleSignInWithGoogle}
              className="w-full bg-white text-gray-500 font-medium rounded-lg p-2 text-sm border shadow-sm hover:shadow-md transition-all flex flex-row items-center justify-center gap-2"
            >
              <GoogleLogo height={18} width={18} />
              Sign in with Google
            </button>

            <div className="flex flex-row justify-center text-xs font-regular text-gray-300 my-3 mb-1">
              Don&apos;t have and account?{" "}
              <Link
                className="text-purple-200 ml-1 cursor-pointer font-medium"
                href={"/register"}
              >
                Sign Up here
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden relative lg:flex h-full w-1/4 items-center justify-center ">
          <div className="w-60 h-60 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full animate-bounce" />
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
        </div>
      </div>
    </>
  );
}

//google logo component
function GoogleLogo({ height = 24, width = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}

//spinner component
// function Spinner({ className }) {
//   return (
//     <div
//       className={
//         "animate-spin rounded-full bg-white border-gray-700 border-t-white border-2 " +
//         className
//       }
//     ></div>
//   );
// }
