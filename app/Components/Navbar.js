// app/Components/Navbar.js
import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';


export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
        <Image src="/logo.png" alt="ToToCompany Logo" width={60} height={60} />
        ToTo Company</Link>
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
        <li className={styles.signIn}>
          <Link href="/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}
