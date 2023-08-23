import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";
import './index.css';

const Navbar = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownClick = (event) => {
    const position = {
      top: event.target.offsetTop + event.target.offsetHeight,
      left: event.target.offsetLeft,
    };
    setDropdownPosition(position);
    toggleDropdown();
  };

  return (
    <div className="nav-bar map-bar" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <nav>
        <h1 id="logo" className="logo">RELPE</h1>
        <ul className="links-nav">
          <NavLink exact to="/"><li>{props.foption}</li></NavLink>
          <a href="http://localhost:8080/"><li>{props.soption}</li></a>
          <li  onClick={handleDropdownClick} className="dropdown-option">{props.dropdownOption}</li>
          {dropdownVisible && (
            <ul className="dropdown-menu" style={dropdownPosition}>
              <NavLink to="/dashboard"><li>{props.toption}</li></NavLink>
              <NavLink to="/customer"><li>{props.coption}</li></NavLink>
            </ul>
          )}
        </ul>
        <NavLink to={props.paths}><button>{props.logBtn}</button></NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
