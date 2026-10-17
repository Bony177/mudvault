
import { useEffect, useRef } from "react";

import "./Hero.css";
import background from "../../assets/background.webp";
import mudvaultTitle from "../../assets/mudvault.png";
import bikeVideo from "../../assets/bike.webm";

// =========================================
// ADJUSTABLE TEXT ANIMATION SETTINGS
// =========================================

// Increase this to make the COMPLETE text movement slower.
// Recommended values: 1.2 - 2.5
const TEXT_MOVEMENT_DURATION = 1.2;

// Percentage of text movement allocated to entrance.
const TEXT_ENTER_RATIO = 0.3;

// Remaining percentage is allocated to exit.
const TEXT_EXIT_RATIO = 1 - TEXT_ENTER_RATIO;

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
      if (!video.duration || timeline) return;

      const textElements = [
        leftTextRef.current,
        rightTextRef.current,
      ];

      // Initial state: hidden below the viewport.
      gsap.set(textElements, {
        y: "35vh",
        opacity: 0,
      });

      // Main scroll-controlled timeline.
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // =========================================
      // BIKE VIDEO
      // Original animation duration preserved.
      // =========================================

      timeline.to(
        video,
        {
          currentTime: video.duration,
          ease: "none",
          duration: 1,
        },
        0
      );

      // =========================================
      // TEXT ENTERS FROM BELOW
      // =========================================

      const enterDuration =
        TEXT_MOVEMENT_DURATION * TEXT_ENTER_RATIO;

      const exitDuration =
        TEXT_MOVEMENT_DURATION * TEXT_EXIT_RATIO;

      timeline.to(
        textElements,
        {
          y: 0,
          opacity: 1,
          ease: "none",
          duration: enterDuration,
        },
        0
      );

      // =========================================
      // TEXT CONTINUES UPWARD AND FADES OUT
      // Starts immediately after entrance.
      // =========================================

      timeline.to(
        textElements,
        {
          y: "-50vh",
          opacity: 0,
          ease: "none",
          duration: exitDuration,
        },
        enterDuration
      );

      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", setupAnimation);

    if (video.readyState >= 1) {
      setupAnimation();
    }

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        setupAnimation
      );

      if (timeline) {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-sticky">

        {/* BACKGROUND */}
        <img
          className="hero-background"
          src={background}
          alt=""
        />

        {/* BIKE VIDEO */}
        <video
          ref={videoRef}
          className="hero-bike"
          muted
          playsInline
          preload="auto"
        >
          <source src={bikeVideo} type="video/webm" />
        </video>

        {/* LEFT TEXT */}
        <div
          ref={leftTextRef}
          className="hero-text hero-text-left"
        >
          <h2>BUILT FOR THE WILD</h2>

          <p>
            Designed to conquer every road, every trail,
            and everything in between.
          </p>
        </div>

        {/* RIGHT TEXT */}
        <div
          ref={rightTextRef}
          className="hero-text hero-text-right"
        >
          <h2>RIDE BEYOND LIMITS</h2>

          <p>
            At MUDVAULT, we believe riding is more than just a
            sport; it is a feeling of freedom, a pursuit of
            adventure, and an escape from the ordinary. Built
            around the raw spirit of motocross and the untamed
            beauty of off-road terrain, our track aims to create
            an experience where adrenaline meets exploration and
            every ride becomes a story worth telling. From
            challenging corners and rugged trails to the thrill
            of accelerating across open dirt, every moment
            invites you to push your limits, discover your
            potential, and reconnect with the simple joy of
            riding. Whether you're an experienced rider chasing
            the perfect line or an enthusiast looking for
            something different, MUDVAULT offers a space to
            develop your skills, embrace new challenges, and
            share your passion with a community driven by the
            same spirit of adventure. We want every visit to
            feel like a break from routine, where the roar of
            engines replaces the noise of everyday life and
            the track becomes your playground. More than just
            a destination, MUDVAULT is a celebration of freedom,
            determination, and the beautifully unpredictable
            nature of off-road riding.
          </p>
        </div>

        {/* TITLE + LOGOS */}
        <div className="hero-content">
          <img
            className="hero-title"
            src={mudvaultTitle}
            alt="MUDVAULT"
          />

          <span className="hero-logos-placeholder">
            LOGOS
          </span>
        </div>

      </div>
    </section>
  );
}

export default Hero;
