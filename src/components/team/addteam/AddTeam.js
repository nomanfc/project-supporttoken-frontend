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
  get_all_designation,
  get_all_department,
} from "../../../http_requests/http_req";

const AddTeam = () => {
  const { user } = useUserContext();
  const [teamData, setTeamData] = useState({ status: 1 });
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();

  const fetchData = useCallback(async () => {
    const dataDes = await get_all_designation();
    setDesignation(dataDes.data.data);

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
    create_team(teamData).then((res) => {
      if (res.data) {
        Router.push("/team/allmember");
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
          Personal Information
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
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
                size="small"
                fullWidth
                id="outlined-basic"
                label="Member Name"
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
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
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
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
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
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <SelectM
                  disabled={
                    user?.data?.type === "client" ||
                    user?.data?.type === "employee"
                      ? true
                      : false
                  }
                  disabled={
                    user?.data?.type === "client" ||
                    user?.data?.type === "employee"
                      ? true
                      : false
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Gender"
                  onChange={handleChange}
                  name="gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
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
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
                size="small"
                type="date"
                fullWidth
                id="outlined-basic"
                label="Date of Birth"
                name="birthDate"
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
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
                size="small"
                fullWidth
                id="outlined-basic"
                label="User Id"
                onChange={handleChange}
                name="userId"
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <SelectM
                  disabled={
                    user?.data?.type === "client" ||
                    user?.data?.type === "employee"
                      ? true
                      : false
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Type"
                  onChange={handleChange}
                  name="type"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
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
                  Designation
                </InputLabel>
                <SelectM
                  disabled={
                    user?.data?.type === "client" ||
                    user?.data?.type === "employee"
                      ? true
                      : false
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Designation"
                  onChange={handleChange}
                  name="designationId"
                >
                  {designation?.map((data, index) => (
                    <MenuItem key={index} value={data?.designationId}>
                      {data?.name}
                    </MenuItem>
                  ))}
                </SelectM>
              </FormControl>
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
                  disabled={
                    user?.data?.type === "client" ||
                    user?.data?.type === "employee"
                      ? true
                      : false
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={duration || ""}
                  label="Department"
                  onChange={handleChange}
                  name="departmentId"
                >
                  {department?.map((data, index) => (
                    <MenuItem key={index} value={data?.departmentId}>
                      {data?.name}
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
              <TextField
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
                size="small"
                fullWidth
                id="outlined-basic"
                label="Email"
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
                disabled={
                  user?.data?.type === "client" ||
                  user?.data?.type === "employee"
                    ? true
                    : false
                }
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
          disabled={
            user?.data?.type === "client" || user?.data?.type === "employee"
              ? true
              : false
          }
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

export default AddTeam;
