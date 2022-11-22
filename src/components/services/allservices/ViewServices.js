import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";
//mui styles
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useUserContext } from "../../../contexts/UserContext";

//http requests
import {
  change_supports_status_close,
  change_supports_status_open,
  get_all_supports,
  get_support_by_id,
  update_support,
  get_all_department,
  delete_support_by_id,
  get_department_by_did,
} from "../../../http_requests/http_req";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const AllServices = () => {
  const { user } = useUserContext();
  const [services, setServices] = useState("");
  const [editData, setEditData] = useState("");
  const [deleteData, setDeleteData] = useState("");
  const [department, setDepartment] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (data) => (e) => {
    setOpen(true);
    get_support_by_id(data.data.supportId).then((res) => {
      setEditData(res.data.data);
    });
  };

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = (data) => (e) => {
    setOpenDel(true);
    setDeleteData(data.data);
  };
  const handleCloseDel = () => setOpenDel(false);

  const fetchData = useCallback(async () => {
    const data = await get_all_supports();
    setServices(data.data.data);

    const dataDep = await get_all_department();
    setDepartment(dataDep.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChangeStatusClose = (data) => (e) => {
    change_supports_status_close(data.data.supportId).then((res) => {
      fetchData();
    });
  };

  const handleChangeStatusOpen = (data) => (e) => {
    change_supports_status_open(data.data.supportId).then((res) => {
      fetchData();
    });
  };

  const handleSupportChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (e) => {
    update_support(editData).then((res) => {
      if (res.data) {
        handleClose();
        fetchData();
      }
    });
  };

  const handleDeleteById = (e) => {
    delete_support_by_id(deleteData.supportId).then((res) => {
      handleCloseDel();
      fetchData();
    });
  };

  return (
    <div>
      <Modal
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Want To Delete This Service ?
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <Button style={{ color: "red" }} onClick={handleDeleteById}>
              Delete
            </Button>
            <Button onClick={() => setOpenDel(false)}>Cancel</Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#599f22" }}
          >
            Edit Service Data
          </Typography>
          <div style={{ width: "100%" }}>
            <TextField
              size="small"
              fullwidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={editData?.title}
              name="title"
              onChange={handleSupportChange}
              style={{ marginTop: "20px", width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth size="small" style={{ marginTop: "15px" }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <SelectM
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //   value={duration || ""}
                value={String(editData?.department)}
                label="Department"
                onChange={handleSupportChange}
                name="department"
              >
                {department?.map((data, index) => (
                  <MenuItem value={data?.name}>{data?.name}</MenuItem>
                ))}
              </SelectM>
            </FormControl>

            <TextField
              size="small"
              fullwidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={editData?.description}
              name="description"
              onChange={handleSupportChange}
              style={{ marginTop: "20px", width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              onClick={handleSaveChanges}
              variant="contained"
              style={{
                marginTop: "25px",
                width: "100%",
                background: "#599f22",
              }}
            >
              Save Changes
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
              width: "20%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
              marginRight: "30px",
            }}
          >
            Title
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "20%",
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
              width: "20%",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "space-between",
            }}
          >
            Description
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              marginLeft: "25px",
              width: "20%",
              fontSize: "14px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ margin: "auto", fontWeight: 700 }}>Status</div>
          </div>

          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              width: "20%",
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
                width: "100%",
                marginTop: "30px",
                width: "100%",
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
                  width: "20%",
                  fontSize: "14px",
                  marginRight: "30px",
                  justifyContent: "space-between",
                }}
              >
                {data?.title}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "20%",
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
                  width: "20%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                {data?.description}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "25px",
                  width: "20%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                  color: data?.status === 1 ? "#599f22" : "red",
                }}
              >
                <div style={{ margin: "auto" }}>
                  {data?.status === 1 ? "Open" : "Closed"}
                </div>
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "20%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {data?.status === 1 ? (
                    <Button
                      onClick={handleChangeStatusClose({ data })}
                      disabled={user?.data?.type === "client" ? true : false}
                      style={{
                        textTransform: "none",
                        opacity: user?.data?.type === "client" ? 0.5 : 1,
                      }}
                    >
                      Close
                    </Button>
                  ) : (
                    <Button
                      disabled={user?.data?.type === "client" ? true : false}
                      onClick={handleChangeStatusOpen({ data })}
                      style={{
                        textTransform: "none",
                        opacity: user?.data?.type === "client" ? 0.5 : 1,
                      }}
                    >
                      Open
                    </Button>
                  )}

                  <Button
                    disabled={user?.data?.type === "client" ? true : false}
                    style={{
                      textTransform: "none",
                      color: "blue",
                      opacity: user?.data?.type === "client" ? 0.5 : 1,
                    }}
                    onClick={handleOpen({ data })}
                  >
                    Edit
                  </Button>

                  <Button
                    disabled={user?.data?.type === "client" ? true : false}
                    style={{
                      textTransform: "none",
                      color: "red",
                      opacity: user?.data?.type === "client" ? 0.5 : 1,
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

export default AllServices;
