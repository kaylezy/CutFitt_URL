"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuthProvider, firestore } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
// import {
//   GoogleSignInButton,
//   EmailSignUpButton,
// } from "../../firebase/firebase";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInWithGoogle = async () => {
    setError(null);
    setMessage(null);
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const user = userCredential.user;
      await sendEmailVerification(user);

      if (user.emailVerified) {
        setMessage(
          `An email has been sent to ${user.email}. Please verify your email address to continue.`
        );

        //retrieve user data from local storage
        const registrationData = localStorage.getItem("registrationData");
        const { userName = "", password = "" } = registrationData
          ? JSON.parse(registrationData)
          : {};

        //create and store user in data
        localStorage.setItem(
          "registrationData",
          JSON.stringify({
            userName,
            email,
          })
        );

        //check if user exists in firestore database
        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "user", user.uid), {
            userName,
            password,
            email: user.email,
          });
        }

        setMessage("Signed in with Google successfully.");
        router.push("/dashboard");
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      //store user data in local storage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          userName,
          email,
        })
      );

      setMessage(
        `Successful!, An email has been sent to ${email}. Please verify your email address to continue.`
      );

      //clear form fields

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="space-y-6 min-h-screen w-screen text-black flex justify-center items-center transition-all p-2 bg-purple-50">
        <div className="max-w-md flex flex-col items-center justify-center mt-28 shadow-lg border rounded-xl w-full">
          <form
            onSubmit={handleSignup}
            className="flex flex-col border-b rounded-xl w-full  p-4 md:p-8 lg:p-10 py-10 bg-purple-500"
          >
            <h1 className="text-lg font-semibold text-center text-gray-300">
              Sign Up
            </h1>
            <h2 className="text-sm text-gray-300 mb-8 text-center">
              Create an account to access our awesome tool!
            </h2>

            <div className="relative flex flex-col w-full text-gray-300">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                value={userName}
                className="w-full py-2 pl-10 pr-4 p-1.5 rounded-md mb-2 border text-sm text-black focus:border-purple-400 focus:border-2 focus:outline-none"
                placeholder="Enter your Username"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <FaUser className="absolute pl-3 h-5 w-7 top-8 text-purple-900" />
            </div>

            <div className="relative flex flex-col w-full text-gray-300">
              <label htmlFor="email">Email</label>
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
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full py-2 pl-10 pr-4 p-1.5 rounded-md mb-2 border text-sm text-black focus:border-purple-400 focus:border-2 focus:outline-none"
                value={password}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <RiLockPasswordFill className="absolute pl-2 h-6 w-9 top-8 text-purple-900" />
              <div
                className="absolute left-72 top-8 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-6 w-9 text-purple-900" />
                ) : (
                  <FaEye className="h-6 w-9 text-purple-900" />
                )}
              </div>
            </div>

            <div className="relative flex flex-col w-full text-gray-300">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="passwordConfirmation"
                className="w-full py-2 pl-10 pr-4 p-1.5 rounded-md mb-2 border text-sm text-black focus:border-purple-400 focus:border-2 focus:outline-none"
                value={passwordConfirmation}
                placeholder="Confirm your Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <RiLockPasswordFill className="absolute pl-2 h-6 w-9 top-8 text-purple-900" />

              <div
                className="absolute left-72 top-8 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-6 w-9 text-purple-900" />
                ) : (
                  <FaEye className="h-6 w-9 text-purple-900" />
                )}
              </div>
            </div>

            {error && <p className="text-red-300">{error}</p>}
            {message && <p className="text-green-300">{message}</p>}

            <button
              // email={email}
              // password={password}
              // setError={setMessage}
              // setLoading={setLoading}
              className="w-full mt-3 bg-purple-800 text-white rounded-lg p-2 text-sm shadow-md hover:bg-gradient-to-b from-purple-300 to-purple-900 hover:shadow-lg transition-all disabled:to-purple-400 disabled:from-purple-400"
              disabled={loading}
            >
              Sign Up
            </button>

            <div className="flex flex-row mt-10 w-full items-center mb-8">
              <div className="w-1/2 h-[1px] bg-gray-300"></div>
              <p className="text-gray-400 text-sm font-normal mx-2">or</p>
              <div className="w-1/2 h-[1px] bg-gray-300"></div>
            </div>

            <button
              className="w-full bg-white text-gray-500 font-medium rounded-lg p-2 text-sm border shadow-sm hover:shadow-md transition-all flex flex-row items-center justify-center gap-2"
              onClick={handleSignInWithGoogle}
            >
              <GoogleLogo height={18} width={18} />
              Sign up with Google
            </button>

            <div className="flex flex-row justify-center text-xs font-regular text-gray-300 my-2">
              Existing user?{" "}
              <Link
                className="text-purple-300 ml-1 cursor-pointer font-medium"
                href={"/login"}
                onClick={() => router.push("/login")}
              >
                Sign in
              </Link>
            </div>

            <div className="flex flex-col justify-center text-center text-xs font-regular text-gray-300 my-2">
              <p>By signing in with your account, you agree to</p>
              <p>
                Cutfitt-URL&apos;s Terms of Service, Privacy Policy and
                Acceptable Use Policy.
              </p>
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

//code for google logo
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

//code for spinner
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
