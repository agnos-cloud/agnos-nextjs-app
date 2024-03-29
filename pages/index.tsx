import Link from "next/link";
import Image from "next/image";
import { LOGIN_PATH } from "@constants/paths";
import { useUser } from "@auth0/nextjs-auth0";
import { OrgView } from "@views/org";
import styles from "@styles/Home.module.css";

export default function Home() {
  const { user } = useUser();

  if (user) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <OrgView />
        </main>
      </div>
    );
  }

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
          applications in minutes without compromising quality.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Design</h2>
            <p>Create business domain models using an intuitive user interface.</p>
          </div>

          <div className={styles.card}>
            <h2>Develop</h2>
            <p>Build complete applications in minutes using any technology.</p>
          </div>

          <div className={styles.card}>
            <h2>Distribute</h2>
            <p>Share your project templates and components with other users.</p>
          </div>

          <div className={styles.card}>
            <h2>Deploy</h2>
            <p>Deploy your applications to any popular cloud service provider.</p>
          </div>
        </div>

        <Link href={LOGIN_PATH}>
          <a className={styles.link}>Sign in to continue &rarr;</a>
        </Link>
      </main>
    </div>
  );
}
