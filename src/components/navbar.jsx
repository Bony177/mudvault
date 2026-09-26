import { useEffect, useState } from "react";
import "./navbar.css";
import mudnav from "../assets/mudnav.png";

function Navbar() {
  const [isSecondSectionActive, setIsSecondSectionActive] = useState(false);
  const [isThirdSectionActive, setIsThirdSectionActive] = useState(false);

  useEffect(() => {
    const secondSection = document.getElementById("second-section");
    const thirdSection = document.getElementById("third-section");

    if (!secondSection && !thirdSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "second-section") {
            setIsSecondSectionActive(
              entry.isIntersecting ||
                (entry.boundingClientRect.top < window.innerHeight * 0.5 &&
                  entry.boundingClientRect.bottom > 0),
            );
          }

          if (entry.target.id === "third-section") {
            setIsThirdSectionActive(
              entry.isIntersecting ||
                (entry.boundingClientRect.top < window.innerHeight * 0.5 &&
                  entry.boundingClientRect.bottom > 0),
            );
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px 0px -10% 0px",
      },
    );

    if (secondSection) observer.observe(secondSection);
    if (thirdSection) observer.observe(thirdSection);

    return () => observer.disconnect();
  }, []);

  // Blue ONLY while second section is active.
  // Third section always forces it back to white.
  const navbarIsBlue = isSecondSectionActive && !isThirdSectionActive;

  return (
    <nav className={`navbar ${navbarIsBlue ? "navbar-blue" : ""}`}>
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
