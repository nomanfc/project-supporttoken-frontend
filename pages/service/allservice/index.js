import React from "react";
import Head from "next/head";

import AllServices from "../../../src/components/services/allservices/ViewServices";

const index = () => {
  return (
    <div>
      <Head>
        <title>View All Service</title>
        <meta name="View All Service" content="View All Service" />
        <link rel="icon" href="/Logo.png" />
      </Head>

      <div style={{ width: "98%", margin: "auto" }}>
        <div style={{fontSize:"25px", color:"#599f22", fontWeight:700, marginBottom:"20px"}}>All Services</div>

        <AllServices />
      </div>
    </div>
  );
};

export default index;
