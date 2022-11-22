import React from "react";
import Head from "next/head";


import CreateService from "../../../src/components/services/createservice/CreateService"

const index = () => {
  return (
    <div>
      <Head>
        <title>Create New Service</title>
        <meta name="Create New Service" content="Create New Service" />
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
          Create New Service
        </div>
        <CreateService/>
      </div>
    </div>
  );
};

export default index;
