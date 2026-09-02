import { useEffect, useState } from "react";

import "./navbar.css";
import mudnav from "../assets/mudnav.png";

function Navbar() {
  const [isSecondSectionActive, setIsSecondSectionActive] = useState(false);

  useEffect(() => {
    const secondSection = document.getElementById("second-section");

    if (!secondSection) return;

    const handleIntersection = (entries) => {
      const [entry] = entries;

      setIsSecondSectionActive(
        entry.isIntersecting ||
          (entry.boundingClientRect.top < window.innerHeight * 0.5 &&
            entry.boundingClientRect.bottom > 0),
      );
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "0px 0px -10% 0px",
    });

    observer.observe(secondSection);

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${isSecondSectionActive ? "navbar-blue" : ""}`}>
      <div className="navbar-logo">
        <img src={mudnav} alt="MudVault" />
      </div>

      <div className="navbar-right">
        <div className="navbar-links">
          <a href="#track">TRACK</a>
          <a href="#events">EVENTS</a>
          <a href="#about">ABOUT</a>
          <a href="#gallery">GALLERY</a>
          <a href="#contact">CONTACT</a>
        </div>

        <button className="menu-button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
