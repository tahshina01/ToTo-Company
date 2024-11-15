import styles from './explore.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Explore() {
return (    
    <section className={styles.planyourtrip}>
        <div className={styles.plancontent}>
          <h2>Plan Your Trip</h2>
          <p>Start your adventure today! Find the best places to visit, and plan your perfect trip.</p>
          <Link href="/services">
            <button className={styles.planbutton}>Explore Services</button>
          </Link>
        </div>
    </section>
);
}