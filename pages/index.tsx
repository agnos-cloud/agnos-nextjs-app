import Link from "next/link";
import Image from "next/image";
import { DESIGNS_PATH, STORE_PATH, TEAMS_PATH } from "../constants/paths";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <span className={styles.logo}>
            <Image src="/favicon.png" alt="Agnos Logo" width={100} height={100} />
          </span>
        </div>

        <h1 className={styles.title}>Agnos Cloud</h1>

        <p className={styles.description}>
          Using the power of artificial intelligence and automation, Agnos Cloud enables you to create and deploy your
          applications in minutes without compromising on quality.
        </p>

        <div className={styles.grid}>
          <Link href={DESIGNS_PATH}>
            <a className={styles.card}>
              <h2>Design &rarr;</h2>
              <p>Create business domain models using an intuitive user interface.</p>
            </a>
          </Link>

          <Link href={TEAMS_PATH}>
            <a className={styles.card}>
              <h2>Develop &rarr;</h2>
              <p>Build complete applications in minutes using any technology.</p>
            </a>
          </Link>

          <Link href={STORE_PATH}>
            <a className={styles.card}>
              <h2>Distribute &rarr;</h2>
              <p>Share your project templates and components with other users.</p>
            </a>
          </Link>

          <Link href={`${DESIGNS_PATH}/new`}>
            <a className={styles.card}>
              <h2>Deploy &rarr;</h2>
              <p>Deploy your applications to any popular cloud service provider.</p>
            </a>
          </Link>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
