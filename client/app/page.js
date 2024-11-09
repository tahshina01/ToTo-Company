"use client";

import "./style.css";
import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { TbLogin } from "react-icons/tb";
import Image from "next/image";
import LoginImage from "@/public/log.svg";
import RegImage from "@/public/register.svg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState("This is a warning");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures component renders only after client-side load
  }, []);

  // If not mounted, don’t add the dynamic class
  const containerClass = mounted
    ? `container ${isSignUpMode ? "sign-up-mode" : ""}`
    : "container";

  const handleGoogleAuth = async (details) => {
    const postData = {
      id: details.email,
      name: details.given_name,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/googleAuth`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // setToastMessage("Signed up successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={containerClass}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <p className="title">Sign in</p>
              <TbLogin
                className="text-gray-700"
                style={{
                  fontSize: "38px",
                  marginBottom: "10px",
                  marginRight: "5px",
                }}
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                placeholder="Enter Email"
                value={id}
                required
                onChange={(e) => {
                  setId(e.target.value);
                  setWarning("");
                }}
              />
              <MdEmail
                className="cursor-pointer text-gray-700"
                style={{ fontSize: "22px" }}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setWarning("");
                }}
              />
              {!showPass && (
                <AiFillEye
                  className="cursor-pointer text-gray-700"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setShowPass(true)}
                />
              )}
              {showPass && (
                <AiFillEyeInvisible
                  className="cursor-pointer text-gray-700"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setShowPass(false)}
                />
              )}
            </div>
            <p className="w-full text-center mt-3" style={{ color: "red" }}>
              {warning}
            </p>
            <span
              className="w-full text-center mt-3"
              style={{
                color: "green",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Forget password? Click here
            </span>
            <input type="submit" value="Sign in" className="btn solid" />
            {mounted && (
              <div className="mt-4 w-full flex justify-center items-center">
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const details = jwtDecode(credentialResponse.credential);
                      console.log(details);
                      handleGoogleAuth(details);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            )}
          </form>
          <form action="#" className="sign-up-form">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p className="title">Sign up</p>
              <BiLogIn
                className="text-gray-700"
                style={{ fontSize: "38px", marginBottom: "10px" }}
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                placeholder="Enter Email"
                value={id}
                required
                onChange={(e) => {
                  setId(e.target.value);
                  setWarning("");
                }}
              />
              <MdEmail
                className="cursor-pointer text-gray-700"
                style={{ fontSize: "22px" }}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                  setWarning("");
                }}
              />
              <FaUser
                className="cursor-pointer text-gray-700"
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setWarning("");
                }}
              />
              {!showPass && (
                <AiFillEye
                  className="cursor-pointer text-gray-700"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setShowPass(true)}
                />
              )}
              {showPass && (
                <AiFillEyeInvisible
                  className="cursor-pointer text-gray-700"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setShowPass(false)}
                />
              )}
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setWarning("");
                }}
              />
              {!showConfirmPassword && (
                <AiFillEye
                  className="cursor-pointer text-gray-700"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
              {showConfirmPassword && (
                <AiFillEyeInvisible
                  className="cursor-pointer text-gray-700"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(false)}
                />
              )}
            </div>
            <p className="w-full text-center mt-3" style={{ color: "red" }}>
              {warning}
            </p>
            <input type="submit" className="btn" value="Sign up" />
            {mounted && (
              <div className="mt-4 w-full flex justify-center items-center">
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const details = jwtDecode(credentialResponse.credential);
                      console.log(details);
                      handleGoogleAuth(details);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              You have to create an account first in order to start your journey
              with us
            </p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <Image src={RegImage} alt="reg" className="image" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              You can sign in with your existing account and resume your journey
              with us
            </p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <Image src={LoginImage} alt="log" className="image" />
        </div>
      </div>
    </div>
  );
}
