import React from "react";
import Head from "next/head";

import GiveAccess from "../../../src/components/client/giveaccess/GiveAccess"

const index = () => {
  return (
    <div>
      <Head>
        <title>Give Access to Clients</title>
        <meta name="Give Access to Clients" content="Give Access to Clients" />
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
          Give Access to Clients
        </div>
        <GiveAccess/>
      </div>
    </div>
  );
};

export default index;