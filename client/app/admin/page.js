"use client";

import "./styles.css";
import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { TbLogin } from "react-icons/tb";
import Image from "next/image";
import LoginImage from "@/public/log.svg";
import RegImage from "@/public/register.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobals } from "@/contexts/Globals";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { setToastMessage } = useGlobals();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setMounted(true); // Ensures component renders only after client-side load
  }, []);

  // If not mounted, don’t add the dynamic class
  const containerClass = "container";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (id.includes("@")) {
      setWarning("Invalid id");
      return;
    }

    const postData = {
      id: id,
      password: password,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setToastMessage("Signed in successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setWarning("Invalid credentials");
    }
  };

  return (
    <>
      <div className={containerClass}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleLogin} className="sign-in-form">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <p className="title">Sign in</p>
                <TbLogin
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                    marginRight: "5px",
                  }}
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter Id"
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
                  type={!showPass ? "password" : "text"}
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
              <p className="w-full text-center my-1" style={{ color: "red" }}>
                {warning}
              </p>
              <input
                type="submit"
                value="Sign in"
                className="px-6 py-[6px] cursor-pointer hover:bg-blue-700 rounded-full bg-blue-500 text-white font-bold mt-2"
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content"></div>
            <Image src={RegImage} alt="reg" className="image" />
          </div>
          <div className="panel right-panel">
            <div className="content"></div>
            <Image src={LoginImage} alt="log" className="image" />
          </div>
        </div>
      </div>
    </>
  );
}
