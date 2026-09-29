import { useEffect, useState } from "react";
import "./navbar.css";
import mudnav from "../assets/mudnav.png";

function Navbar() {
  const [isSecondSectionActive, setIsSecondSectionActive] = useState(false);

  const [isThirdSectionActive, setIsThirdSectionActive] = useState(false);

  const [isFourthSectionActive, setIsFourthSectionActive] = useState(false);

  useEffect(() => {
    const secondSection = document.getElementById("second-section");

    const thirdSection = document.getElementById("third-section");

    const fourthSection = document.getElementById("fourth-section");

    if (!secondSection && !thirdSection && !fourthSection) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isActive =
            entry.isIntersecting ||
            (entry.boundingClientRect.top < window.innerHeight * 0.5 &&
              entry.boundingClientRect.bottom > 0);

          if (entry.target.id === "second-section") {
            setIsSecondSectionActive(isActive);
          }

          if (entry.target.id === "third-section") {
            setIsThirdSectionActive(isActive);
          }

          if (entry.target.id === "fourth-section") {
            setIsFourthSectionActive(isActive);
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],

        rootMargin: "0px 0px -10% 0px",
      },
    );

    if (secondSection) {
      observer.observe(secondSection);
    }

    if (thirdSection) {
      observer.observe(thirdSection);
    }

    if (fourthSection) {
      observer.observe(fourthSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
    SECOND SECTION
    → blue

    THIRD SECTION
    → existing behavior

    FOURTH SECTION
    → orange
  */

  const navbarIsBlue =
    isSecondSectionActive && !isThirdSectionActive && !isFourthSectionActive;

  const navbarIsOrange = isFourthSectionActive;

  const navbarIsHero =
    !isSecondSectionActive && !isThirdSectionActive && !isFourthSectionActive;

  return (
    <nav
      className={`
        navbar
        ${navbarIsBlue ? "navbar-blue" : ""}
        ${navbarIsOrange ? "navbar-orange" : ""}
        ${navbarIsHero ? "navbar-hero" : ""}
      `}
    >
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

        <button className="menu-button" aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
