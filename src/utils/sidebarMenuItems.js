import React from "react";

/* Menu Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const menu = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    to: "/",
    onActive: "",
  },

  {
    icon: <MiscellaneousServicesIcon />,
    title: "Services",
    onActive: "service",
    items: [
      {
        title: "Create Service",
        to: "/service/createservice",
        onActive: "createservice",
      },
      {
        title: "All Services",
        to: "/service/allservice",
        onActive: "allservice",
      },
    ],
  },

  {
    icon: <ConfirmationNumberIcon />,

    title: "Tickets",
    onActive: "ticket",
    items: [
      {
        title: "Create Ticket",
        to: "/ticket/createticket",
        onActive: "createticket",
      },
      {
        title: "All Tickets",
        to: "/ticket/allticket",
        onActive: "allticket",
      },
      {
        title: "Edit Tickets",
        to: "/ticket/editticket",
        onActive: "editticket",
      },
    ],
  },

  {
    icon: <PeopleIcon />,
    title: "Clients",
    onActive: "client",
    items: [
      {
        title: "Add Client",
        to: "/client/addclient",
        onActive: "addclient",
      },
      {
        title: "All Clients",
        to: "/client/allclient",
        onActive: "allclient",
      },
      {
        title: "Give access",
        to: "/client/giveaccessclient",
        onActive: "giveaccessclient",
      },
    ],
  },

  {
    icon: <AdminPanelSettingsIcon />,
    title: "Team",
    onActive: "team",
    items: [
      {
        title: "Add Member",
        to: "/team/addmember",
        onActive: "addmember",
      },
      {
        title: "All Members",
        to: "/team/allmember",
        onActive: "allmember",
      },
      {
        title: "Give access",
        to: "/team/giveaccess",
        onActive: "giveaccess",
      },
    ],
  },

  // {
  //   icon: <SupervisedUserCircleIcon />,
  //   title: "Authorized Users",
  //   onActive: "user",
  //   items: [
  //     {
  //       title: "All Users",
  //       to: "/user/alluser",
  //       onActive: "alluser",
  //     },
  //   ],
  // },
];
