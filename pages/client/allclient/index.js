import React from "react";
import Head from "next/head";

import AllClient from "../../../src/components/client/viewclient/ViewClient"

const index = () => {
  return (
    <div>
      <Head>
        <title>View All Clients</title>
        <meta name="View All Clients" content="View All Clients" />
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
         Clients
        </div>
        <AllClient/>
      </div>
    </div>
  );
};

export default index;
