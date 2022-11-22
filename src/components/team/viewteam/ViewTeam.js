import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Router from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";
import { useUserContext } from "../../../contexts/UserContext";

//mui styles
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//http requests
import {
  get_tickets_by_ticket_number,
  change_ticket_status_open,
  change_ticket_status_close,
  get_all_tickets,
  get_products_by_pid,
  get_support_by_sid,
  get_created_by_userid,
  get_all_team,
  delete_team_by_id,
  get_team_by_userid,
  get_designation_by_did,
  get_department_by_did,
  get_all_designation,
  get_all_department,
  edit_team,
} from "../../../http_requests/http_req";

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleEdit = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleDetails = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const AllTeam = () => {
  const { user } = useUserContext();
  const [services, setServices] = useState("");
  const [editData, setEditData] = useState({ status: 1 });
  const [detailData, setDetailData] = useState("");
  const [product, setProduct] = useState("");
  const [support, setSupport] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const [teamData, setTeamData] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();

  const fetchDataEdit = useCallback(async () => {
    const dataDes = await get_all_designation();
    setDesignation(dataDes.data.data);

    const dataDep = await get_all_department();
    setDepartment(dataDep.data.data);
  }, []);

  useEffect(() => {
    fetchDataEdit().catch(console.error);
  }, [fetchDataEdit]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    edit_team(editData).then((res) => {
      if (res.data) {
        Router.push("/team/allmember");
      }
    });
  };

  const fetchData = useCallback(async () => {
    const data = await get_all_team();
    setServices(data.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleCloseDetail = () => setOpenDetail(false);
  const handleOpenDetail = (data) => (e) => {
    setOpenDetail(true);
    get_team_by_userid(data.data.userId).then((res) => {
      setDetailData(res.data.data);
      if (res.data.data) {
        get_department_by_did(res.data.data.departmentId).then((res) => {
          setProduct(res.data.data.name);
        });

        get_designation_by_did(res.data.data.designationId).then((res) => {
          setSupport(res.data.data.name);
        });
      }
    });
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenEdit = (data) => (e) => {
    setOpenEdit(true);
    get_team_by_userid(data.data.userId).then((res) => {
      setEditData(res.data.data);
    });
  };

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = (data) => (e) => {
    setOpenDel(true);
    get_team_by_userid(data.data.userId).then((res) => {
      setEditData(res.data.data);
    });
  };
  const handleCloseDel = () => setOpenDel(false);

  const handleCloseTicket = (e) => {
    change_ticket_status_close(editData.id).then((res) => {
      handleClose();
      fetchData();
    });
  };

  const handleDelete = (e) => {
    delete_team_by_id(editData.id).then((res) => {
      handleCloseDel();
      fetchData();
    });
  };

  return (
    <div>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEdit}>
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
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Member Name"
                    value={editData?.name}
                    onChange={handleChange}
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "47%",
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Address"
                    value={editData?.address}
                    onChange={handleChange}
                    name="address"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Phone Number"
                    value={editData?.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "47%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <SelectM
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={String(editData?.gender)}
                      label="Gender"
                      onChange={handleChange}
                      name="gender"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    size="small"
                    type="date"
                    fullWidth
                    id="outlined-basic"
                    label="Date of Birth"
                    name="birthDate"
                    value={editData?.birthDate}
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
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="User Id"
                    value={editData?.userId}
                    onChange={handleChange}
                    name="userId"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={duration || ""}
                      label="Type"
                      onChange={handleChange}
                      value={String(editData?.type)}
                      name="type"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={duration || ""}
                      label="Designation"
                      onChange={handleChange}
                      name="designationId"
                      value={parseInt(editData?.designationId)}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={duration || ""}
                      label="Department"
                      onChange={handleChange}
                      name="departmentId"
                      value={parseInt(editData?.departmentId)}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    onChange={handleChange}
                    value={editData?.email}
                    name="email"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "47%",
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Linkedin"
                    onChange={handleChange}
                    value={editData?.linkedin}
                    name="linkedin"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <Button
              onClick={() => Router.push("/team/allmember")}
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
              Save changes
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDetails}>
          <Typography
            style={{ color: "#599f22", fontSize: "25px", fontWeight: 700 }}
            id="modal-modal-title"
          >
            Member Information
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                User Id :
              </span>
              <span style={{ width: "75%" }}>{detailData?.userId}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Type :
              </span>
              <span
                style={{
                  width: "75%",
                }}
              >
                {detailData?.type}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Name :
              </span>
              <span style={{ width: "75%" }}>{detailData?.name}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Designation :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>{support}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Department :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>{product}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Email :
              </span>
              <span style={{ width: "75%" }}>{detailData?.email}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Phone Number :
              </span>
              <span style={{ width: "75%" }}>{detailData?.phoneNumber}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Gender :
              </span>
              <span style={{ width: "75%" }}>{detailData?.gender}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Birth Date :
              </span>
              <span style={{ width: "75%" }}>{detailData?.birthDate}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Address :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>
                {detailData?.address}
              </span>
            </div>
            {/* 
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                GitHub Link :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>
              {detailData?.git}
              </span>
            </div> */}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                LinkeDin :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>
                {detailData?.linkedin}
              </span>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Want To Delete This Team Member?
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <Button onClick={handleCloseDel} style={{ color: "gray" }}>
              Cancel
            </Button>
            <Button style={{ color: "red" }} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      <div>
        <div
          style={{
            borderBottom: "1px solid  	#DCDCDC",
            paddingBottom: "10px",
            width: "100%",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
            }}
          >
            User Id
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
            }}
          >
            Name
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
            }}
          >
            Designation
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
            }}
          >
            Department
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
            }}
          >
            Email
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontWeight: 700 }}>Phone</div>
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "14%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div style={{ margin: "auto" }}>Action</div>
          </div>
        </div>

        {services?.length > 0 ? (
          services?.map((data, index) => (
            <div
              key={index}
              style={{
                paddingBottom: "10px",
                width: "100%",
                height: "40px",
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.userId}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.name}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.designation}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.department}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.email}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.phoneNumber}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    disabled={
                      user?.data?.type === "client" ||
                      user?.data?.type === "employee"
                        ? true
                        : false
                    }
                    onClick={handleOpenEdit({ data })}
                    style={{
                      textTransform: "none",
                      color: "blue",
                      opacity:
                        user?.data?.type === "client" ||
                        user?.data?.type === "employee"
                          ? 0.5
                          : 1,
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    style={{ textTransform: "none", color: "#599f22" }}
                    onClick={handleOpenDetail({ data })}
                  >
                    Details
                  </Button>

                  <Button
                    disabled={
                      user?.data?.type === "client" ||
                      user?.data?.type === "employee"
                        ? true
                        : false
                    }
                    style={{
                      textTransform: "none",
                      color: "red",
                      opacity:
                        user?.data?.type === "client" ||
                        user?.data?.type === "employee"
                          ? 0.5
                          : 1,
                    }}
                    onClick={handleOpenDel({ data })}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              color: "black",
              textAlign: "center",
              width: "100%",
              marginTop: "50px",
              fontSize: "20px",
              fontWeight: 600,
              color: "gray",
            }}
          >
            No Data
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTeam;
