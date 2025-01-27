import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <section className={styles.section}>
          <h1>Services</h1>
          <nav className={styles.navLinks}>
            <a href="#">Branding</a>
            <a href="#">Design</a>
            <a href="#">Marketing</a>
            <a href="#">Advertisement</a>
          </nav>
        </section>

        <section className={styles.section}>
          <h1>Company</h1>
          <nav className={styles.navLinks}>
            <a href="#">About us</a>
            <a href="#">Contact</a>
            <a href="#">Jobs</a>
            <a href="#">Press kit</a>
          </nav>
        </section>

        <section className={styles.section}>
          <h1>Legal</h1>
          <nav className={styles.navLinks}>
            <a href="#">Terms of use</a>
            <a href="#">Privacy policy</a>
            <a href="#">Cookie policy</a>
          </nav>
        </section>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 ToToCompany. All rights reserved.</p>

        <div className={styles.socialIconsBottom}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/fb.png" alt="Facebook" width={20} height={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/yt.png" alt="YouTube" width={20} height={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/insta.png" alt="Instagram" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
