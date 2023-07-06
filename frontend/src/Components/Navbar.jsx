import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { useEffect } from "react";
function Navbar() {
  const buton = document.getElementById("Navbar-Hidden");
  const menu = document.getElementById("Reponsive-Nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const menuElement = document.getElementById("Reponsive-Nav");
    const other = document.getElementsByClassName("PreLogin-Container");

    if (menuElement) {
      if (isMenuOpen) {
        menuElement.style.display = "flex";
        console.log("Hi");
      }
    }
  }, [isMenuOpen]);

  return (
    <div className="Navbar">
      <div className="Navbar-Container">
        <a id="Navbar-Left" href="/Home">
          THREE <span id="color-navbar">MAIL</span>
        </a>
        <div id="Navbar-Middle">
          <a href="/Home">HOME</a>
          <a href="/Home">FAQ</a>
          <a href="/Home">ABOUT</a>
        </div>
        <button id="Navbar-button" href="/Home">
          JOIN
        </button>
        <button id="Navbar-Hidden" href="#" onClick={toggleMenu}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      <div id="Reponsive-Nav">
        <a href="/Home">HOME</a>
        <a href="/Home">FAQ</a>
        <a href="/Home">ABOUT</a>
      </div>
    </div>
  );
}

export default Navbar;
