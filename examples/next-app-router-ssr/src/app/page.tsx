import styles from "./page.module.css";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@/components/Button"), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <Button variant="secondary">Click me!</Button>
    </main>
  );
}
