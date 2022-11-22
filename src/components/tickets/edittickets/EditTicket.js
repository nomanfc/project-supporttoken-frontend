import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
  delete_ticket_by_id,
  get_all_products,
  get_all_supports,
  get_all_client,
  create_ticket,
  edit_ticket,
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
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
};

const EditTicket = () => {
  const { user } = useUserContext();
  const [services, setServices] = useState("");
  const [editData, setEditData] = useState("");
  const [supportDept, setSupportDept] = useState();
  const [product, setProduct] = useState();
  const [client, setClient] = useState();
  const [ticketData, setTicketData] = useState({ createdBy: user.data.userId });

  //get support, dept, clients
  const fetchDataEdit = useCallback(async () => {
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
    fetchDataEdit().catch(console.error);
  }, [fetchDataEdit]);

  const fetchData = useCallback(async () => {
    const data = await get_all_tickets();
    setServices(data.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDelete = (data) => (e) => {
    setOpenDelete(true);
    setEditData(data.data);
  };

  const handleDeleteTicket = (e) => {
    get_tickets_by_ticket_number(editData.ticketNumber).then((res) => {
      if (res.data.data.id) {
        delete_ticket_by_id(res.data.data.id).then((res) => {
          if (res) {
            setOpenDelete(false);
            fetchData();
          }
        });
      }
    });
  };

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleCloseDetail = () => setOpenDetail(false);

  const handleOpenDetail = (data) => (e) => {
    setOpenDetail(true);
    get_tickets_by_ticket_number(data.data.ticketNumber).then((res) => {
      setTicketData(res.data.data);
    });
  };

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    edit_ticket(ticketData).then((res) => {
      if (res.data) {
        setOpenDetail(false);
        fetchData();
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
          <div
            style={{
              color: "#599f22",
              fontSize: "25px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Edit Ticket
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
                    disabled
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Ticket Number"
                    value={ticketData?.ticketNumber}
                    onChange={handleChange}
                    name="ticketNumber"
                    // onChange={handle_Bid_Info}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Support Dept.
                    </InputLabel>
                    <SelectM
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={parseInt(ticketData?.supportId)}
                      label="Support Dept."
                      onChange={handleChange}
                      name="supportId"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value={parseInt(ticketData?.productId)}
                      label="Product Name"
                      onChange={handleChange}
                      name="productId"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value={String(ticketData?.userId)}
                      label="Select Client"
                      onChange={handleChange}
                      name="userId"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    <InputLabel id="demo-simple-select-label">
                      Priority
                    </InputLabel>
                    <SelectM
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={String(ticketData?.priority)}
                      label="Priority"
                      onChange={handleChange}
                      name="priority"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    value={ticketData?.subject}
                    name="subject"
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
                    width: "100%",
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Description"
                    name="description"
                    value={ticketData?.description}
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
          <div style={{ width: "fit-content", margin: "auto" }}>
            <Button
              onClick={handleCloseDetail}
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
        </Box>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Want To Delete This Ticket?
          </Typography>

          <div style={{ marginTop: "40px" }}>
            <Button style={{ color: "red" }} onClick={handleDeleteTicket}>
              Delete
            </Button>
            <Button onClick={handleCloseDelete} style={{ color: "gray" }}>
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
                  <Button
                    disabled={user?.data?.type === "client" ? true : false}
                    style={{
                      textTransform: "none",
                      color: "#599f22",
                      opacity: user?.data?.type === "client" ? 0.5 : 1,
                    }}
                    onClick={handleOpenDetail({ data })}
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
                    onClick={handleDelete({ data })}
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

export default EditTicket;
