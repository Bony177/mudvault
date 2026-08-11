import "./Hero.css";
import background from "../../assets/background.webp";
import mudvaultTitle from "../../assets/mudvault.png";

function Hero() {
  return (
    <section className="hero">
      {/* Background */}
      <img className="hero-background" src={background} alt="" />

      {/* MUDVAULT title */}
      <div className="hero-content">
        <img className="hero-title" src={mudvaultTitle} alt="MUDVAULT" />
      </div>
    </section>
  );
}

export default Hero;
