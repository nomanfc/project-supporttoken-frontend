import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
  get_team_by_userid,
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

const AllTickets = () => {
  const { user } = useUserContext();
  const [services, setServices] = useState("");
  const [editData, setEditData] = useState("");
  const [detailData, setDetailData] = useState("");
  const [product, setProduct] = useState("");
  const [support, setSupport] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [client, setClient] = useState("");

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleCloseDetail = () => setOpenDetail(false);

  const handleOpenDetail = (data) => (e) => {
    setOpenDetail(true);
    get_tickets_by_ticket_number(data.data.ticketNumber).then((res) => {
      setDetailData(res.data.data);
      if (res.data.data) {
        get_products_by_pid(res.data.data.productId).then((res) => {
          setProduct(res.data.data);
        });

        get_support_by_sid(res.data.data.supportId).then((res) => {
          setSupport(res.data.data);
        });

        get_created_by_userid(res.data.data.userId).then((res) => {
          setClient(res.data.data);
        });

        get_team_by_userid(res.data.data.createdBy).then((res) => {
          setCreatedBy(res.data.data);
        });
      }
    });
  };


  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (data) => (e) => {
    setOpen(true);
    get_tickets_by_ticket_number(data.data.ticketNumber).then((res) => {
      setEditData(res.data.data);
    });
  };

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = (data) => (e) => {
    setOpenDel(true);
    get_tickets_by_ticket_number(data.data.ticketNumber).then((res) => {
      setEditData(res.data.data);
    });
  };
  const handleCloseDel = () => setOpenDel(false);

  const fetchData = useCallback(async () => {
    const data = await get_all_tickets();
    setServices(data.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleCloseTicket = (e) => {
    change_ticket_status_close(editData.id).then((res) => {
      handleClose();
      fetchData();
    });
  };

  const handleOpenTicket = (e) => {
    change_ticket_status_open(editData.id).then((res) => {
      handleCloseDel();
      fetchData();
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
            Ticket Details
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Ticket Number :
              </span>
              <span style={{ width: "75%" }}>{detailData?.ticketNumber}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Ticket Status :
              </span>
              <span
                style={{
                  width: "75%",
                  color: detailData?.status === "open" ? "#599f22" : "red",
                }}
              >
                {detailData?.status === "open" ? "Open" : "Closed"}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Support Name :
              </span>
              <span style={{ width: "75%" }}>{support?.title}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Product Name :
              </span>
              <span style={{ width: "75%" }}>{product?.name}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Priority :
              </span>
              <span style={{ width: "75%" }}>{detailData?.priority}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Subject :
              </span>
              <span style={{ width: "75%" }}>{detailData?.subject}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Description :
              </span>
              <span style={{ width: "75%", fontSize: "13px" }}>
                {detailData?.description}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Client :
              </span>
              <span style={{ width: "75%" }}>{client?.name}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                Created by :
              </span>
              <span style={{ width: "75%" }}>{createdBy?.name}</span>
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
            Want To Open This Ticket?
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <Button style={{ color: "#599f22" }} onClick={handleOpenTicket}>
              Open
            </Button>
            <Button onClick={handleCloseDel} style={{ color: "gray" }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Want To Close This Ticket?
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <Button style={{ color: "red" }} onClick={handleCloseTicket}>
              Close
            </Button>
            <Button onClick={handleClose} style={{ color: "gray" }}>
              Cancel
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
            Ticket No.
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
            Support Name
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
            Subject
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
            Client
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
            Created By
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
            <div style={{ fontWeight: 700 }}>Status</div>
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
                {data?.ticketNumber}
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
                {data?.productName}
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
                {data?.subject}
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
                {data?.clientName}
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
                {data?.createdBy}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "14%",
                  fontSize: "14px",
                  justifyContent: "space-between",
                  color: data?.status === "open" ? "#599f22" : "red",
                }}
              >
                {data?.status === "open" ? "Open" : "Closed"}
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
                  {data?.status === "open" ? (
                    <Button
                    disabled={user?.data?.type === "client" ? true : false}
                      onClick={handleOpen({ data })}
                      style={{ textTransform: "none" }}
                    >
                      Close
                    </Button>
                  ) : (
                    <Button
                    disabled={user?.data?.type === "client" ? true : false}
                      onClick={handleOpenDel({ data })}
                      style={{ textTransform: "none" }}
                    >
                      Open
                    </Button>
                  )}

                  <Button
                    style={{ textTransform: "none", color: "blue" }}
                    onClick={handleOpenDetail({ data })}
                  >
                    Details
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

export default AllTickets;
