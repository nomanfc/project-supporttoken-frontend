import React from "react";
import Head from "next/head";
import EditTicket from "../../../src/components/tickets/edittickets/EditTicket";

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
          Edit Tickets
        </div>
        <EditTicket />
      </div>
    </div>
  );
};

export default index;
