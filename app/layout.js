// app/layout.js
import Navbar from './Components/Navbar'; // Import your Navbar component
import localFont from "next/font/local";
import "./globals.css";

// Load local fonts (if needed)
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Optional metadata
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render Navbar on all pages */}
        <Navbar />

        {/* The content of each page will be injected here */}
        <main>{children}</main>
      </body>
    </html>
  );
}
