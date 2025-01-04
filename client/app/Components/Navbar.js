// app/Components/Navbar.js
"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { useGlobals } from "@/contexts/Globals";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function Navbar() {
  const pathname = usePathname();
  const { toastRef, toastMessage, setToastMessage } = useGlobals();
  const router = useRouter();

  useEffect(() => {
    const verifyJwt = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verifyJwtToken`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            return;
          }
        } catch (error) {
          console.log("Error:", error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            if (pathname !== "/auth") {
              setToastMessage("Please sign in to continue");
            }
            router.push("/auth");
          }
        }
      } else {
        if (pathname !== "/auth") {
          setToastMessage("Please sign in to continue");
        }
        router.push("/auth");
      }
    };

    // verifyJwt(); // Call the function here
  }, []); // Include dependencies

  useEffect(() => {
    if (toastMessage !== "") {
      toastRef && toastRef.current && toastRef.current.click();
    }
  }, [toastMessage]);

  return (
    <nav
      className={styles.navbar}
      style={pathname === "/auth" ? { display: "none" } : {}}
    >
      <div style={{ display: "none" }}>
        <Toast />
      </div>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ToToCompany Logo"
            width={60}
            height={60}
          />
          ToTo Company
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li
          className={styles.signIn}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
          }}
        >
          <Link href="/auth">Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
}
