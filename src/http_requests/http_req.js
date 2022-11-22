import axios from "axios";
import { BASE_URL } from "../constants/constant";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  if (Cookies.get("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(Cookies.get("user")).token
    }`;
  }
  return req;
});

// Login
export const login_user = (loginData) => {
  return axios.post(`${BASE_URL}/api/login/`, loginData);
};

//////////////////////services//////////////////////////
//get all services
export const get_all_services = () => {
  return API.get("/api/supports/");
};

export const create_service = (teamData) => {
  return API.post("/api/supports/", teamData);
};

//get all supports
export const get_all_supports = () => {
  return API.get("/api/supports/");
};

//change support status
export const change_supports_status_open = (id) => {
  return API.patch("/api/supports/status/", { status: 1, supportId: id });
};

export const change_supports_status_close = (id) => {
  return API.patch("/api/supports/status/", { status: 0, supportId: id });
};

//edit support
export const update_support = (editData) => {
  return API.put("/api/supports/", editData);
};

export const get_support_by_id = (id) => {
  return API.get(`/api/supports/${id}`);
};

//delete support data
export const delete_support_by_id = (id) => {
  return API.delete(`/api/supports/${id}`);
};

///////////////////////////TICKETS///////////////////////

//get all ticket
export const get_all_tickets = () => {
  return API.get("/api/tickets/join/all");
};

//get ticket by ticketNumber
export const get_tickets_by_ticket_number = (ticketNumber) => {
  return API.get(`/api/tickets/${ticketNumber}`);
};

//change ticket status
export const change_ticket_status_open = (id) => {
  return API.patch("/api/tickets/status", { status: "open", id: id });
};

export const change_ticket_status_close = (id) => {
  return API.patch("/api/tickets/status", { status: "closed", id: id });
};

//create ticket
export const create_ticket = (ticketData) => {
  return API.post("/api/tickets", ticketData);
};

//product
export const get_products_by_pid = (pid) => {
  return API.get(`/api/products/${pid}`);
};

export const get_all_products = () => {
  return API.get(`/api/products/`);
};

//edit ticket
export const edit_ticket = (ticketData) => {
  return API.put(`/api/tickets/`, ticketData);
};

//support
export const get_support_by_sid = (sid) => {
  return API.get(`/api/supports/${sid}`);
};

export const get_created_by_userid = (id) => {
  return API.get(`/api/users/${id}`);
};

//delete ticket
export const delete_ticket_by_id = (id) => {
  return API.delete(`/api/tickets/${id}`);
};

/////////////////////TEAM/////////////////////////////
export const get_all_team = () => {
  return API.get("/api/team");
};

export const create_team = (teamData) => {
  return API.post("/api/team/", teamData);
};

//delete team
export const delete_team_by_id = (id) => {
  return API.delete(`/api/team/${id}`);
};

//editTeam
export const edit_team = (editData) => {
  return API.put(`/api/team/`, editData);
};

//get team
export const get_team_by_userid = (userId) => {
  return API.get(`/api/team/${userId}`);
};

//get designation
export const get_designation_by_did = (id) => {
  return API.get(`/api/designations/${id}`);
};

//get department
export const get_department_by_did = (id) => {
  return API.get(`/api/depertments/${id}`);
};

//check if has password
export const check_password_by_userid = (id) => {
  return API.get(`/api/users/haveAccess/${id}`);
};

/////////////Clients///////////////////////////
export const get_all_client = () => {
  return API.get("/api/clients");
};

//delete client
export const delete_client_by_id = (id) => {
  return API.delete(`/api/clients/${id}`);
};

//get team
export const get_client_by_userid = (userId) => {
  return API.get(`/api/clients/${userId}`);
};

//create client
export const create_client = (clientData) => {
  return API.post(`/api/clients/`, clientData);
};

//update client
export const update_client = (editData) => {
  return API.put(`/api/clients/`, editData);
};

//get all designation
export const get_all_designation = () => {
  return API.get("/api/designations");
};

//get all department
export const get_all_department = () => {
  return API.get("/api/depertments");
};

//giving system access....
export const give_access = (accessData) => {
  return API.put("/api/users/", accessData);
};

//check email duplication
export const check_duplication = (accessData) => {
  return API.get(`api/clients/isduplicate/${accessData}`);
};
