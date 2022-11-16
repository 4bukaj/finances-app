import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import "./SideNav.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SideNav() {
  //LOGOUT, USER DATA
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  //---------END ------------------

  const [sidebar, setSidebar] = useState(true);
  const expandSidebar = () => setSidebar(!sidebar);
  const menuItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const [itemState, setItemState] = useState({
    activeItem: menuItems[0],
    items: menuItems,
  });

  function toggleActive(index) {
    setItemState({ ...itemState, activeItem: itemState.items[index] });
  }

  function toggleActiveStyles(index) {
    if (itemState.items[index] === itemState.activeItem) {
      return "active-item";
    } else {
      return "none";
    }
  }

  return (
    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-menu-items">
        <li className="navbar-toggle" onClick={expandSidebar}>
          <Link to="#" className="menu-bars">
            {sidebar ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
          </Link>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li
              key={index}
              className={sidebar ? "nav-text" : "nav-text-expanded"}
            >
              <Link
                to={item.path}
                className={toggleActiveStyles(index)}
                onClick={() => {
                  toggleActive(index);
                }}
              >
                {item.icon}
                <span
                  className={sidebar ? "item-title" : "item-title expanded"}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="logout-button-container">
        <div className="logout-button" onClick={handleLogout}>
          <LogoutIcon />
          <span
            className={
              sidebar ? "logout-button-title" : "logout-button-title expanded"
            }
          >
            Log out
          </span>
        </div>
      </div>
    </nav>
  );
}
