import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/LOGIN/Login";
import Signup from "../Pages/Signup/Signup";
import Event from "../Pages/Dashboard/Admin/AdminComponent/Event";
// import SideNav from "../Pages/Dashboard/Admin/SideNav";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Attendie from "../Pages/Dashboard/Admin/AdminComponent/Attendie";
import CreateEvent from "../Pages/Dashboard/Admin/AdminComponent/CreateEvent";
import Communication from "../Pages/Dashboard/Admin/AdminComponent/Communication";
import UserDashboard from "../Pages/Dashboard/User/UserDashboard";
import UserEvent from "../Pages/Dashboard/User/UserComponent/UserEvent"
import EventCreate from "../Pages/Dashboard/User/UserComponent/EventCreate"

const theme = createTheme(); // Create a theme instance (can be customized)

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />}>
            <Route index element={<Event />} /> {/* Default route */}
            <Route path="events" element={<Event />} />
            <Route
              path="/admin_dashboard/attendee-list"
              element={<Attendie />}
            />
            <Route
              path="/admin_dashboard/eventcreate"
              element={<CreateEvent />}
            />
            <Route
              path="/admin_dashboard/communicate"
              element={<Communication />}
            />
            <Route path="update_event/:id" element={<CreateEvent />} />

          </Route>
          <Route path="/user_dashboard" element={<UserDashboard />}>
            <Route index element={<UserEvent />} /> {/* Default route */}
            <Route path="userevent" element={<Event />} />
            <Route
              path="/user_dashboard/eventcreate"
              element={<EventCreate />}
            />
            
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default Home;
