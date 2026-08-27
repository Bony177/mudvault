import { useEffect, useRef } from "react";

import "./Hero.css";
import background from "../../assets/background.webp";
import mudvaultTitle from "../../assets/mudvault.png";
import bikeVideo from "../../assets/bike.webm";
import logos from "../../assets/logos.png";

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

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

    let timeline;

    const setupAnimation = () => {
      if (!video.duration) return;

      // Set initial text state
      gsap.set(leftTextRef.current, {
        y: 0,
        opacity: 1,
      });

      gsap.set(rightTextRef.current, {
        y: 0,
        opacity: 1,
      });

      // Main scroll timeline
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,

          start: "top top",

          end: "bottom bottom",

          scrub: 0.8,

          invalidateOnRefresh: true,
        },
      });

      // ------------------------------------------------
      // BIKE
      // ------------------------------------------------

      timeline.to(
        video,
        {
          currentTime: video.duration,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // ------------------------------------------------
      // LEFT TEXT
      // ------------------------------------------------

      timeline.to(
        leftTextRef.current,
        {
          y: "-50vh",
          opacity: 0,
          ease: "none",
          duration: 0.5,
        },
        0,
      );

      // ------------------------------------------------
      // RIGHT TEXT
      // ------------------------------------------------

      timeline.to(
        rightTextRef.current,
        {
          y: "-50vh",
          opacity: 0,
          ease: "none",
          duration: 0.5,
        },
        0,
      );

      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", setupAnimation);

    if (video.readyState >= 1) {
      setupAnimation();
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupAnimation);

      if (timeline) {
        timeline.scrollTrigger?.kill();
        timeline.kill();
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

        {/* Left Text */}
        <div ref={leftTextRef} className="hero-text hero-text-left">
          <h2>BUILT FOR THE WILD</h2>

          <p>
            Designed to conquer every road, every trail, and everything in
            between.
          </p>
        </div>

        {/* Right Text */}
        <div ref={rightTextRef} className="hero-text hero-text-right">
          <h2>RIDE BEYOND LIMITS</h2>

          <p>
            Power, freedom and adventure come together in one unforgettable
            machine.
          </p>
        </div>

        {/* Title + Logos */}
        <div className="hero-content">
          <img className="hero-title" src={mudvaultTitle} alt="MUDVAULT" />

          <img className="hero-logos" src={logos} alt="Partner logos" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
