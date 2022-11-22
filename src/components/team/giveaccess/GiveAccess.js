import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  get_all_team,
  delete_team_by_id,
  get_team_by_userid,
  get_designation_by_did,
  get_department_by_did,
  check_password_by_userid,
  give_access,
} from "../../../http_requests/http_req";

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const GiveAccess = () => {
  const { user } = useUserContext();
  const [services, setServices] = useState("");
  const [giveAccessData, setGiveAccessData] = useState("");
  const [editData, setEditData] = useState();
  const [accessData, setAccessData] = useState({
    status: 1,
  });

  const [openAccess, setOpenAccess] = React.useState(false);
  const handleCloseAccess = () => setOpenAccess(false);

  const handleOpenAccess = (data) => (e) => {
    setOpenAccess(true);
    setGiveAccessData(data.data);
    setAccessData({
      ...accessData,
      type: data.data.type,
      id: data.data.id,
      email: data.data.email,
    });

    check_password_by_userid(data.data.userId).then((res) => {
      setEditData(res.data.success);
    });
  };

  const handlePassChange = (e) => {
    setAccessData({ ...accessData, password: e.target.value });
  };

  const handleUpdate = (e) => {
    give_access(accessData).then((res) => {
      if (res.data) {
        setOpenAccess(false);
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

  return (
    <div>
      <Modal
        open={openAccess}
        onClose={handleCloseAccess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <div
            style={{ color: "#599f22", fontSize: "20px", fontWeight: "bold" }}
          >
            Give System Access
          </div>

          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <TextField
                disabled
                size="small"
                fullWidth
                id="outlined-basic"
                label="User Id"
                name="userId"
                value={giveAccessData?.userId}
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <TextField
                disabled
                size="small"
                fullWidth
                id="outlined-basic"
                label="Email"
                name="email"
                value={giveAccessData?.email}
                variant="outlined"
              />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              {editData === 0 ? (
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  type="password"
                  label="Password"
                  name="password"
                  onChange={handlePassChange}
                  variant="outlined"
                />
              ) : (
                <div style={{ color: "#599f22" }}>
                  This User Already Has System Access
                </div>
              )}
            </div>
          </div>

          {editData === 0 ? (
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
              }}
            >
              <Button
                onClick={() => setOpenAccess(false)}
                style={{
                  textTransform: "none",
                  background: "gray",
                  color: "#FFFFFF",
                  padding: "5px 30px",
                  marginRight: "10px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                style={{
                  textTransform: "none",
                  background: "#599f22",
                  color: "#FFFFFF",
                  padding: "5px 30px",
                }}
              >
                Submit
              </Button>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "block",
              }}
            >
              <Button
                onClick={() => setOpenAccess(false)}
                style={{
                  textTransform: "none",
                  background: "gray",
                  color: "#FFFFFF",
                  padding: "5px 30px",
                  marginLeft: "80%",
                }}
              >
                Cancel
              </Button>
            </div>
          )}
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
                    onClick={handleOpenAccess({ data })}
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
                    Give Access
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

export default GiveAccess;
