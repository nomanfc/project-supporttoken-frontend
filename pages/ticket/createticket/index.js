import React from "react";
import Head from "next/head";

import CreateTicket from "../../../src/components/tickets/createticket/CreateTicket"

const index = () => {
  return (
    <div>
      <Head>
        <title>Create New Ticket</title>
        <meta name="Create New Ticket" content="Create New Ticket" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <div style={{ width: "100%", margin: "auto" }}>
        <div
          style={{
            fontSize: "25px",
            color: "#599f22",
            fontWeight: 700,
            marginBottom: "20px",

          }}
        >
          Create New Ticket
        </div>
        <CreateTicket/>
      </div>
    </div>
  );
};

export default index;
