import "./navbar.css";
import mudnav from "../assets/mudnav.png";

function Navbar() {
  return (
    <nav className="navbar">
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
