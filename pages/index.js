import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Dashboard from "../src/components/Dashboard/dashboard";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta
          name="Dashboard"
          content="Displays sunnary of all system activity"
        />
        <link rel="icon" href="/Logo.png" />
      </Head>

      <div style={{ width: "98%", margin: "auto" }}>
        <div
          style={{
            fontSize: "25px",
            color: "#599f22",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Dashboard
        </div>
        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
