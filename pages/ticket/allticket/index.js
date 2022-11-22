import React from "react";
import Head from "next/head";

import AllTickets from "../../../src/components/tickets/alltickets/ViewTickets";

const index = () => {
  return (
    <div>
      <Head>
        <title>View All Tickets</title>
        <meta name="View All Tickets" content="View All Tickets" />
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
          Tickets
        </div>
       <AllTickets/>
      </div>
    </div>
  );
};

export default index;
