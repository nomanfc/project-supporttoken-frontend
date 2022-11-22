import React from "react";
import Head from "next/head";

import AllTeam from "../../../src/components/team/viewteam/ViewTeam"

const index = () => {
  return (
    <div>
      <Head>
        <title>View All Team Members</title>
        <meta name="View All Team Members" content="View All Team Members" />
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
          Team Members
        </div>
        <AllTeam/>
      </div>
    </div>
  );
};

export default index;