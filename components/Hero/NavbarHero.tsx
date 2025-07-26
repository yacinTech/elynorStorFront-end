"use client";

import Image from "next/image";
import styles from "./NavbarHero.module.css";

export default function NavbarHero() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Left Text */}
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Discover Quality & Style with{" "}
              <span className={styles.highlight}>Elynor Store</span>
            </h1>

            <p className={styles.heroDescription}>
              Welcome to Elynor, your one-stop shop offering a wide range of products
              across various categories to meet all your needs and desires.
            </p>

            <div className={styles.heroButtons}>
              <a href="#products" className={styles.btnPrimary}>
                Shop Now
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.heroImageContainer}>
            <Image
              src="/introu.jpg"
              alt="happy team"
              width={1850}
              height={1080}
              className={styles.heroImage}
              priority
            />

            <div className={styles.employeeCard}>
              <div className={styles.employeeImages}>
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    src={`/customers/customer${i + 1}.jpg`}
                    alt={`customer ${i + 1}`}
                    width={48}
                    height={48}
                    className={`${styles.employeeImage} ${i === 0 ? styles.firstEmployeeImage : ""}`}
                  />
                ))}
              </div>
              <div>
                <p className={styles.employeeCount}>1,000+ Happy Customers</p>
                <p className={styles.employeeRating}>
                  <span className={styles.star}>&#9733;</span> 5.0 (500+ reviews)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
