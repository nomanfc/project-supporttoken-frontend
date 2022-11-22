import React from "react";
import Head from "next/head";

import GiveAccess from "../../../src/components/team/giveaccess/GiveAccess"

const index = () => {
  return (
    <div>
      <Head>
        <title>Give Access to Team Members</title>
        <meta name="Give Access to Team Members" content="Give Access to Team Members" />
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
          Give Access to Team Members
        </div>
        <GiveAccess/>
      </div>
    </div>
  );
};

export default index;