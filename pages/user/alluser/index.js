import React from "react";
import Head from "next/head";

const index = () => {
  return (
    <div>
      <Head>
        <title>View All Users</title>
        <meta name="View All Users" content="View All Users" />
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
          Authorized Members Who Have Access
        </div>
        View All Tickets
      </div>
    </div>
  );
};

export default index;
