import React, { useState } from "react";
import logo from "../../images/Exclude.png";
import "./navbar.css";
import { Outlet, Link } from "react-router-dom";
import LoginButton from "./LoginButton";

import menu from "../../images/menu.svg";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState("");
  const [menuSectionVisible, setMenuSectionVisible] = useState(false);

  const handleMenuToggle = (category) => {
    setActiveButton(category);
    setMenuSectionVisible(false);
  };

  const handleMenuSection = () => {
    setMenuSectionVisible(!menuSectionVisible);
  };

  const handleMenuButtonClick = (category) => {
    setActiveButton(category);
    setMenuSectionVisible(false);
  };

  return (
    <div className="Navbar">
      <Link style={{ textDecoration: "none" }} to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <Outlet />
      <div className="navbarcenter">
        <Link to="/list?category=men">
          <button
            className={
              menuSectionVisible && activeButton === "men" ? "active" : ""
            }
            onClick={() => handleMenuToggle("men")}
          >
            <h3>MEN</h3>
          </button>
        </Link>

        <Link to="/list?category=women">
          <button
            className={
              menuSectionVisible && activeButton === "women" ? "active" : ""
            }
            onClick={() => handleMenuToggle("women")}
          >
            <h3>WOMEN</h3>
          </button>
        </Link>

        <Link to="/list?category=kids">
          <button
            className={
              menuSectionVisible && activeButton === "kids" ? "active" : ""
            }
            onClick={() => handleMenuToggle("kids")}
          >
            <h3>KIDS</h3>
          </button>
        </Link>

        <Link to="/list?category=sports">
          <button
            className={
              menuSectionVisible && activeButton === "sports" ? "active" : ""
            }
            onClick={() => handleMenuToggle("sports")}
          >
            <h3>SPORTS</h3>
          </button>
        </Link>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <LoginButton />
        <div
          className="menuicon"
          style={{
            justifySelf: "flex-end",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={handleMenuSection}
          >
            <img alt="" src={menu} />
          </button>
        </div>
      </div>

      {menuSectionVisible && (
        <div className="menusection">
          <Link to="/list?category=men">
            <button onClick={() => handleMenuButtonClick("men")}>MEN</button>
          </Link>
          <Link to="/list?category=women">
            <button onClick={() => handleMenuButtonClick("women")}>
              WOMEN
            </button>
          </Link>
          <Link to="/list?category=kids">
            <button onClick={() => handleMenuButtonClick("kids")}>KIDS</button>
          </Link>
          <Link to="/list?category=sports">
            <button onClick={() => handleMenuButtonClick("sports")}>
              SPORTS
            </button>
          </Link>
          <Link to="/login">
            <button style={{marginTop:"30px"}}>
              <div className=''>LOGIN</div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
