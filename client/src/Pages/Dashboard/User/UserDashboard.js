import React, { useState,useEffect } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";
import { MdEventAvailable } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

// ROUTING

import { Link, Outlet, useNavigate } from "react-router-dom";

// STYLES
import "./UserDashboard.css";


const SidebarData = [
  {
    title: "Events",
    icon: <MdEventAvailable />,
    path: "/user_dashboard",
    cName: "nav-text",
  },
  
  {
    title: "CreateEvent",
    icon: <MdCreate />,
    path: "/user_dashboard/eventcreate",
    cName: "nav-text",
  },
  
];

export default function UserDashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events/getEvents'); // Adjust URL if necessary
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.clear(); // Clear the token from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar items-center ">
          <div className="flex justify-center items-center space-x-2">
            <Link to="#" className="menu-bars ">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <h1 className="text-white">Event Management System</h1>
          </div>
          <div className="bg-white flex rounded-md p-2 items-center">
            <p className="text-black flex items-center space-x-4">
              Search
              <FaSearch className="ml-2" style={{ color: "black" }} />
             
            </p>
            <input
              type="text"
              className="ml-2 outline-none border-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title or location"
            />
          </div>
          <div>
            <button
              color="inherit"
              onClick={handleLogout} // Add onClick handler
              sx={{ position: "absolute", right: "16px" }}
              className="hover:bg-blue-700 bg-white w-28 rounded-md pt-1 pb-1 text-md font-bold text-black flex justify-center"
            >
              Logout
              <LuLogOut
                style={{ color: "black !important", marginLeft: "8px" }}
              />
            </button>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={sidebar ? "main-content shifted" : "main-content"}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1595037935521-15ce2282a03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NTZ8fHxlbnwwfHx8fHw%3D')`,
         
        }}>
          <Outlet context={{ filteredEvents }} />
        </div>
      </IconContext.Provider>
    </>
  );
}
