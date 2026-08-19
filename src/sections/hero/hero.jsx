import { useEffect, useRef } from "react";

import "./Hero.css";
import background from "../../assets/background.webp";
import mudvaultTitle from "../../assets/mudvault.png";
import bikeVideo from "../../assets/bike.webm";
import logos from "../../assets/logos.png";

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger was not loaded.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let animation;

    const setupVideoScroll = () => {
      if (!video.duration) return;

      animation = gsap.to(video, {
        currentTime: video.duration,

        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,

          start: "top top",

          end: "bottom bottom",

          scrub: 0.8,

          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", setupVideoScroll);

    if (video.readyState >= 1) {
      setupVideoScroll();
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupVideoScroll);

      if (animation) {
        animation.kill();
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-sticky">
        {/* Background */}
        <img className="hero-background" src={background} alt="" />

        {/* Bike */}
        <video
          ref={videoRef}
          className="hero-bike"
          muted
          playsInline
          preload="auto"
        >
          <source src={bikeVideo} type="video/webm" />
        </video>

        {/* Title */}
        <div className="hero-content">
          <img className="hero-title" src={mudvaultTitle} alt="MUDVAULT" />
          <img className="hero-logos" src={logos} alt="Partner logos" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
