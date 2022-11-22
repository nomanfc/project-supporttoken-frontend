import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Router from "next/router";

//mui styles
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useUserContext } from "../../../contexts/UserContext";
//http requests
import {
  get_tickets_by_ticket_number,
  change_ticket_status_open,
  change_ticket_status_close,
  get_all_tickets,
  get_products_by_pid,
  get_support_by_sid,
  get_created_by_userid,
  get_all_client,
  delete_client_by_id,
  get_client_by_userid,
  get_designation_by_did,
  get_department_by_did,
  update_client,
} from "../../../http_requests/http_req";

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
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

const AllClient = () => {
  const { user } = useUserContext();
  const [services, setServices] = useState("");
  const [editData, setEditData] = useState("");
  const [detailData, setDetailData] = useState("");

  const fetchData = useCallback(async () => {
    const data = await get_all_client();
    setServices(data.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleCloseDetail = () => setOpenDetail(false);
  const handleOpenDetail = (data) => (e) => {
    setOpenDetail(true);
    get_client_by_userid(data.data.userId).then((res) => {
      setDetailData(res.data.data);
      if (res.data.data) {
      }
    });
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenEdit = (data) => (e) => {
    setOpenEdit(true);
    get_client_by_userid(data.data.userId).then((res) => {
      setEditData(res.data.data);
    });
  };

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = (data) => (e) => {
    setOpenDel(true);
    get_client_by_userid(data.data.userId).then((res) => {
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
    delete_client_by_id(editData.id).then((res) => {
      handleCloseDel();
      fetchData();
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    update_client(editData).then((res) => {
      if (res.data) {
        Router.push("/client/allclient");
      }
    });
  };

  return (
    <div>
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
            Client Information
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
                Client Name :
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
                  fontSize: "14px",
                }}
              >
                Business Sector :
              </span>
              <span style={{ width: "75%", fontSize: "14px" }}>
                {detailData?.businessSector}
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
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Contact Person :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>
                {detailData?.contactPerson}
              </span>
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
                {detailData?.git || "- - - -"}
              </span>
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
                LinkeDin :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>
                {detailData?.linkedin || "- - - -"}
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
            Want To Delete This Client?
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

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <div
            style={{
              color: "#599f22",
              fontWeight: 600,
              margin: "20px 10px",
              fontSize: "25px",
            }}
          >
            Edit Client
          </div>
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
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Client Name"
                    onChange={handleChange}
                    value={editData?.name}
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
                    label="Business Sector"
                    onChange={handleChange}
                    value={editData?.businessSector}
                    name="businessSector"
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
                    onChange={handleChange}
                    value={editData?.phoneNumber}
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
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Address"
                    onChange={handleChange}
                    name="address"
                    value={editData?.address}
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
                    disabled
                    id="outlined-basic"
                    label="User Id"
                    onChange={handleChange}
                    value={editData?.userId}
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
                    marginTop: "0px",
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Contact Person"
                    name="contactPerson"
                    value={editData?.contactPerson}
                    onChange={handleChange}
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
                    label="Client's Email"
                    value={editData?.email}
                    onChange={handleChange}
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
                    label="Contact Phone"
                    value={editData?.contactNumber}
                    onChange={handleChange}
                    name="contactNumber"
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
                    label="Github"
                    onChange={handleChange}
                    value={editData?.git}
                    name="git"
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
              onClick={handleSubmit}
              style={{
                textTransform: "none",
                background: "#599f22",
                color: "#FFFFFF",
                padding: "10px 100px",
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
            Business Sector
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
            }}
          >
            Contacted with
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
                {data?.businessSector}
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
                }}
              >
                {data?.contactPerson}
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
                    disabled={user?.data?.type === "client" ? true : false}
                    onClick={handleOpenEdit({ data })}
                    style={{
                      textTransform: "none",
                      color: "blue",
                      opacity: user?.data?.type === "client" ? 0.5 : 1,
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

export default AllClient;
