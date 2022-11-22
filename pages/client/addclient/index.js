import React from "react";
import Head from "next/head";

import AddClient from "../../../src/components/client/addclient/AddClient"

const index = () => {
  return (
    <div>
      <Head>
        <title>Add New Client</title>
        <meta
          name="Add New Client"
          content="Add New Client"
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
          Add New Client
        </div>
        <AddClient/>
      </div>
    </div>
  );
};

export default index;
