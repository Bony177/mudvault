import { useEffect, useRef } from "react";

import "./Hero.css";
import background from "../../assets/background.webp";
import mudvaultTitle from "../../assets/mudvault.png";
import bikeVideo from "../../assets/bike.webm";
import gridPic from "../../assets/gridpic.png";

// =========================================
// ADJUSTABLE TEXT ANIMATION SETTINGS
// =========================================

// Overall text movement duration
const TEXT_MOVEMENT_DURATION = 3;

// Percentage allocated to entrance
const TEXT_ENTER_RATIO = 0.3;
const TEXT_EXIT_RATIO = 1 - TEXT_ENTER_RATIO;

// Upward exit distance
const TEXT_EXIT_DISTANCE = "-50vh";

// =========================================
// RIGHT TEXT FADE LINE SETTINGS
// =========================================

// Fade line position from the top of the viewport
// 35 = 35% of viewport height
const TEXT_FADE_LINE_VH = 55;

// Width of the gradual fade transition in pixels
const TEXT_FADE_SIZE = 100;

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
    let resizeHandler;

    const setupAnimation = () => {
      if (!video.duration || timeline) return;

      const leftText = leftTextRef.current;
      const rightText = rightTextRef.current;

      if (!leftText || !rightText) return;

      const enterDuration = TEXT_MOVEMENT_DURATION * TEXT_ENTER_RATIO;

      const exitDuration = TEXT_MOVEMENT_DURATION * TEXT_EXIT_RATIO;

      // =========================================
      // RIGHT TEXT FADE MASK
      // Above line = transparent
      // Below line = visible
      // =========================================

      const updateFadeMask = () => {
        const rect = rightText.getBoundingClientRect();

        const fadeLineY = window.innerHeight * (TEXT_FADE_LINE_VH / 100);

        // Convert the viewport line into the moving
        // right-side container's local coordinates.
        const localLineY = fadeLineY - rect.top;

        rightText.style.setProperty("--fade-line-y", `${localLineY}px`);

        rightText.style.setProperty("--fade-size", `${TEXT_FADE_SIZE}px`);
      };

      // =========================================
      // INITIAL POSITIONS
      // =========================================

      // Left text retains its original fade-in.
      gsap.set(leftText, {
        y: "35vh",
        opacity: 0,
      });

      // Right text enters fully visible.
      gsap.set(rightText, {
        y: "35vh",
      });

      // =========================================
      // MAIN SCROLL TIMELINE
      // =========================================

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: updateFadeMask,
          onRefresh: updateFadeMask,
        },
      });

      // BIKE VIDEO
      timeline.to(
        video,
        {
          currentTime: video.duration,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // =========================================
      // TEXT ENTRANCE
      // =========================================

      // Left text: original entrance animation
      timeline.to(
        leftText,
        {
          y: 0,
          opacity: 1,
          ease: "none",
          duration: enterDuration,
        },
        0,
      );

      // Right text: slides in without fading in
      timeline.to(
        rightText,
        {
          y: 0,
          ease: "none",
          duration: enterDuration,
        },
        0,
      );

      // =========================================
      // TEXT EXIT
      // =========================================

      // Left text: original upward exit and fade
      timeline.to(
        leftText,
        {
          y: TEXT_EXIT_DISTANCE,
          opacity: 0,
          ease: "none",
          duration: exitDuration,
        },
        enterDuration,
      );

      // Right text: moves upward without container fade.
      // The CSS mask controls its fade line.
      timeline.to(
        rightText,
        {
          y: TEXT_EXIT_DISTANCE,
          ease: "none",
          duration: exitDuration,
        },
        enterDuration,
      );

      // =========================================
      // KEEP FADE LINE ALIGNED
      // =========================================

      resizeHandler = updateFadeMask;

      window.addEventListener("resize", resizeHandler);

      updateFadeMask();
      ScrollTrigger.refresh();
      updateFadeMask();
    };

    video.addEventListener("loadedmetadata", setupAnimation);

    if (video.readyState >= 1) {
      setupAnimation();
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupAnimation);

      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }

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
        <img className="hero-background" src={background} alt="" />

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
        <div ref={leftTextRef} className="hero-text hero-text-left">
          <h2>BUILT FOR THE WILD</h2>

          <p>
            Designed to conquer every road, every trail, and everything in
            between.
          </p>
        </div>

        {/* RIGHT TEXT + GALLERY */}
        <div ref={rightTextRef} className="hero-text hero-text-right">
          <p>
            At MUDVAULT, we believe riding is more than just a sport; it is a
            feeling of freedom, a pursuit of adventure, and an escape from the
            ordinary. Built around the raw spirit of motocross and the untamed
            beauty of off-road terrain, our track aims to create an experience
            where adrenaline meets exploration and every ride becomes a story
            worth telling. From challenging corners and rugged trails to the
            thrill of accelerating across open dirt, every moment invites you to
            push your limits, discover your potential, and reconnect with the
            simple joy of riding. Whether you're an experienced rider chasing
            the perfect line or an enthusiast looking for something different,
            MUDVAULT offers a space to develop your skills, embrace new
            challenges, and share your passion with a community driven by the
            same spirit of adventure. We want every visit to feel like a break
            from routine, where the roar of engines replaces the noise of
            everyday life and the track becomes your playground. More than just
            a destination, MUDVAULT is a celebration of freedom, determination,
            and the beautifully unpredictable nature of off-road riding.
          </p>

          <img
            className="hero-gridpic"
            src={gridPic}
            alt="MUDVAULT motocross track gallery"
          />
        </div>

        {/* TITLE + LOGOS */}
        <div className="hero-content">
          <img className="hero-title" src={mudvaultTitle} alt="MUDVAULT" />

          <span className="hero-logos-placeholder">LOGOS</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
