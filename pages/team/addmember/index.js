import React from "react";
import Head from "next/head";

import AddTeam from "../../../src/components/team/addteam/AddTeam"

const index = () => {
  return (
    <div>
      <Head>
        <title>Add New Team Member</title>
        <meta name="Add New Team Member" content="Add New Team Member" />
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
          Add New Team Member
        </div>
        <AddTeam/>
      </div>
    </div>
  );
};

export default index;