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
  create_team,
  create_service,
  get_all_designation,
  get_all_department,
} from "../../../http_requests/http_req";

const CreateService = () => {
  const {user} = useUserContext();
  const [teamData, setTeamData] = useState({ status: 1 });
  const [department, setDepartment] = useState();

  const fetchData = useCallback(async () => {
    const dataDep = await get_all_department();
    setDepartment(dataDep.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    create_service(teamData).then((res) => {
      if (res.data) {
        Router.push("/service/allservice");
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
          Service Information
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
                label="Title"
                onChange={handleChange}
                name="title"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <SelectM
                disabled={user?.data?.type === "client" ? true : false}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Department"
                  onChange={handleChange}
                  name="department"
                >
                  {department?.map((data, index) => (
                    <MenuItem value={data?.name}>{data?.name}</MenuItem>
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
                width: "100%",
              }}
            >
              <TextField
              disabled={user?.data?.type === "client" ? true : false}
                size="small"
                type="date"
                fullWidth
                id="outlined-basic"
                label="Description"
                name="description"
                multiline
                rows={4}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "fit-content", margin: "40px auto" }}>
        <Button
          onClick={() => Router.push("/service/allservice")}
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

export default CreateService;
