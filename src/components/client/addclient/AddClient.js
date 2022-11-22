import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";

import { useUserContext } from "../../../contexts/UserContext";

import {
  get_all_products,
  get_all_supports,
  get_all_client,
  create_ticket,
  create_client,
  check_duplication
} from "../../../http_requests/http_req";

const AddClient = () => {
  const {user} = useUserContext();
  const [clientData, setClientData] = useState({ type: "client", status: 1 });
  const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleDuplication = (e) =>{
    check_duplication(e.target.value).then((res)=>{
      if(res.data.data) {
        setDuplicate(true);
      }
    })
  }

  console.log(duplicate)

  const handleSubmit = (e) => {
    create_client(clientData).then((res) => {
      if (res.data) {
        Router.push("/client/allclient");
      }
    });
  };


  return (
    <div>
      <div
        style={{
          height: "fit-content",
          borderRadius: "10px",
          margin: "10px auto",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        }}
      >
        <div
          style={{
            padding: "20px 35px",
            width: "100%",
            background: "#DEECD3",
            fontSize: "18px",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          Client Information
        </div>

        <div
          style={{
            padding: "30px 35px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Client Name"
                onChange={handleChange}
                name="name"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Business Sector"
                onChange={handleChange}
                name="businessSector"
                variant="outlined"
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "15px",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Phone Number"
                onChange={handleChange}
                name="phoneNumber"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Address"
                onChange={handleChange}
                name="address"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "fit-content",
          borderRadius: "10px",
          margin: "40px auto",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        }}
      >
        <div
          style={{
            padding: "20px 35px",
            width: "100%",
            background: "#DEECD3",
            fontSize: "18px",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          Official Information
        </div>

        <div
          style={{
            padding: "30px 35px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
               disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="User Id"
                onChange={handleChange}
                onKeyUp={handleDuplication}
                name="userId"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
                marginTop: "0px",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Contact Person"
                name="contactPerson"
                onChange={handleChange}
                variant="outlined"
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "15px",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Client's Email"
                onChange={handleChange}
                name="email"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Contact Phone"
                onChange={handleChange}
                name="contactPhone"
                variant="outlined"
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "15px",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Github"
                onChange={handleChange}
                name="git"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                fullWidth
                id="outlined-basic"
                label="Linkedin"
                onChange={handleChange}
                name="linkedin"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <Button
          onClick={() => Router.push("/client/allclient")}
          style={{
            textTransform: "none",
            background: "gray",
            color: "#FFFFFF",
            padding: "10px 100px",
            marginRight: "20px",
          }}
        >
          Cancel
        </Button>

        <Button
        disabled={user?.data?.type === "client" ? true : false}
          onClick={handleSubmit}
          style={{
            textTransform: "none",
            background: "#599f22",
            color: "#FFFFFF",
            padding: "10px 100px",
            opacity: user?.data?.type === "client" ? 0.5 : 1,
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default AddClient;
