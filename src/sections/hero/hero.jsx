import "./Hero.css";
import background from "../../assets/background.webp";

function Hero() {
  return (
    <section className="hero">
      <img className="hero-background" src={background} alt="Hero background" />
    </section>
  );
}

export default Hero;
