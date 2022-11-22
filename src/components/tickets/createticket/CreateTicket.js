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
} from "../../../http_requests/http_req";

const CreateTicket = () => {
  const { user } = useUserContext();
  const [supportDept, setSupportDept] = useState();
  const [product, setProduct] = useState();
  const [client, setClient] = useState();
  const [ticketData, setTicketData] = useState({ createdBy: user.data.userId });

  //get support, dept, clients
  const fetchData = useCallback(async () => {
    const support = await get_all_supports();
    setSupportDept(support.data.data);

    const products = await get_all_products();
    setProduct(products.data.data);

    const clients = await get_all_client();
    setClient(clients.data.data);

    setTicketData({ ...ticketData, createdBy: user.data.userId });
    setTicketData({ ...ticketData, status: "open" });
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    create_ticket(ticketData).then((res) => {
      if (res.data) {
        Router.push("/ticket/allticket");
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
          Ticket Information
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
                size="small"
                fullWidth
                id="outlined-basic"
                label="Ticket Number"
                onChange={handleChange}
                name="ticketNumber"
                // onChange={handle_Bid_Info}
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
                marginTop: "0px",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Support Dept.
                </InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Support Dept."
                  onChange={handleChange}
                  name="supportId"
                >
                  {supportDept?.map((data, index) => (
                    <MenuItem key={index} value={data?.supportId}>
                      {data?.title}
                    </MenuItem>
                  ))}
                </SelectM>
              </FormControl>
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
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Product Name
                </InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Product Name"
                  onChange={handleChange}
                  name="productId"
                >
                  {product?.map((data, index) => (
                    <MenuItem key={index} value={data?.productId}>
                      {data?.name}
                    </MenuItem>
                  ))}
                </SelectM>
              </FormControl>
            </div>

            <div
              style={{
                width: "47%",
                marginTop: "0px",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Client
                </InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Select Client"
                  onChange={handleChange}
                  name="userId"
                >
                  {client?.map((data, index) => (
                    <MenuItem key={index} value={data?.userId}>
                      {data?.name}
                    </MenuItem>
                  ))}
                </SelectM>
              </FormControl>
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
          Ticket Description
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
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Priority"
                  onChange={handleChange}
                  name="priority"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </SelectM>
              </FormControl>
            </div>

            <div
              style={{
                width: "47%",
                marginTop: "0px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Subject"
                name="subject"
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
                width: "100%",
              }}
            >
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Description"
                name="description"
                multiline
                rows={4}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <Button
          onClick={() => Router.push("/ticket/allticket")}
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
          onClick={handleSubmit}
          style={{
            textTransform: "none",
            background: "#599f22",
            color: "#FFFFFF",
            padding: "10px 100px",
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateTicket;
