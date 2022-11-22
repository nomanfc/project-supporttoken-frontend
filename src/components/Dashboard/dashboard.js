import React, { useEffect, useState, useCallback } from "react";
import Ticket from "./Tickets";
import Service from "./Service";
import Client from "./Clients";
import Team from "./Team";

function useWindowSize() {
  const [rows, setRows] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const Dashboard = () => {
  const size = useWindowSize();
  return (
    <div style={{}}>
      <div
        style={{
          marginTop: "10px",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: size.width <= 1200 ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "360px",
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            width: "47%",
            marginBottom: size.width <= 1200 ? "30px" : "0px",
          }}
        >
          <Service />
        </div>

        <div
          style={{
            height: "360px",
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
          }}
        >
          <Ticket />
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          marginBottom:"50px",
          flexDirection: size.width <= 1200 ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "360px",
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            width: "47%",
            marginBottom: size.width <= 1200 ? "30px" : "0px",
          }}
        >
          <Client />
        </div>

        <div
          style={{
            height: "360px",
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
          }}
        >
          <Team />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
