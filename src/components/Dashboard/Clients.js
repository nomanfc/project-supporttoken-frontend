import React, { useEffect, useState, useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { get_all_client } from "../../http_requests/http_req";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
  return hDisplay + " " + mDisplay;
}

const Client = () => {
  const { user } = useUserContext();
  const [rows, setRows] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await get_all_client();
    setRows(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);



  return (
    <div
      style={{
        width: "100%",
        background: "#FFFFFF",
        borderRadius: "10px",
        marginTop: "10px",
        boxShadow: `rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,
      }}
    >
      <div>
        <div
          style={{
            width: "100%",
            borderRadius: "10px 10px 0 0",
            padding: "20px 50px",
            background: "#DEECD3",
            color: "green",
            display: "flex",
            justifyContent: "space-between",
            fontWeight:700,
          }}
        >
          <span> Clients</span>
          <span>
            Total Clients : <span style={{marginLeft:"10px"}}> {rows?.length} </span>
          </span>
        </div>
      </div>

      <div style={{ margin: "20px 50px", border: "1px solid white" }}>
        <div
          style={{
            width: "100%",
            padding: "5px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            background: "#FFFFFF",
            color: "#444444",
            marginBottom: "10px",
            fontWeight: "700",
            borderBottom: "1px solid rgba(67, 71, 85, 0.27)",
          }}
        >
          <div style={{ marginRight: "10px", width: "33%" }}>Name</div>
          <div
            style={{ marginRight: "10px", width: "33%", textAlign: "center" }}
          >
            Business Sector
          </div>
          <div
            style={{ marginRight: "10px", width: "33%", textAlign: "center" }}
          >
            Email
          </div>
        </div>

        <div
          className="scroll"
          style={{
            height: "250px",
            marginBottom: "20px",
            overflowY: "scroll",
            background: "#FFFFFF",
            color: "#666666",
          }}
        >
          {rows?.map((data, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                padding: "5px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                borderBottom: "1px solid rgba(67, 71, 85, 0.27) ",
              }}
            >
              <div
                style={{ marginRight: "10px", width: "33%", fontSize: "13px" }}
              >
                {data?.name}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  width: "33%",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {data?.businessSector}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  width: "33%",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {data?.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;