import { useEffect, useRef } from "react";

import "./Second.css";

import trackVideo from "../../assets/track01.webm";
import trackMap from "../../assets/track01.png";

function Second() {
  const sectionRef = useRef(null);
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
          trigger: sectionRef.current,

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
    <section ref={sectionRef} className="track-section">
      <div className="track-sticky">
        {/* =========================================
            HEADER
        ========================================= */}

        <header className="track-header">
          <div className="track-logo">MUDVAULT</div>

          <nav className="track-nav">
            <a href="#track" className="active">
              TRACK
            </a>

            <a href="#events">EVENTS</a>

            <a href="#about">ABOUT</a>

            <a href="#gallery">GALLERY</a>

            <a href="#contact">CONTACT</a>

            <button className="track-menu" aria-label="Open menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </header>

        {/* =========================================
            MAIN TITLE
        ========================================= */}

        <h1 className="track-title">TRACK 01</h1>

        {/* =========================================
            TRACK MAP
        ========================================= */}

        <div className="track-map">
          <div className="section-label">
            <span>TRACK MAP</span>
            <i></i>
          </div>

          <img src={trackMap} alt="Track 01 map" />
        </div>

        {/* =========================================
            TRACK VIDEO
        ========================================= */}

        <div className="track-video-wrapper">
          <video
            ref={videoRef}
            className="track-video"
            muted
            playsInline
            preload="auto"
          >
            <source src={trackVideo} type="video/webm" />
          </video>
        </div>

        {/* =========================================
            DESCRIPTION
        ========================================= */}

        <div className="track-description">
          <h2>
            BUILT FOR CHAOS.
            <br />
            MADE FOR CONTROL.
          </h2>

          <div className="small-line"></div>

          <p>
            A next-level dirt experience designed to test every part of you and
            your machine. Every turn has a purpose. Every lap tells a story.
          </p>
        </div>

        {/* =========================================
            EXPLORE BUTTON
        ========================================= */}

        <button className="explore-button">
          <span>EXPLORE THE TRACK</span>

          <span className="arrow">→</span>
        </button>

        {/* =========================================
            TRACK STATISTICS
        ========================================= */}

        <div className="track-stats">
          <div className="stat">
            <div className="stat-icon">◈</div>

            <div>
              <strong>3.8 KM</strong>
              <span>TRACK LENGTH</span>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">△</div>

            <div>
              <strong>64 M</strong>
              <span>ELEVATION GAIN</span>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">⚑</div>

            <div>
              <strong>23+</strong>
              <span>OBSTACLES</span>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">♢</div>

            <div>
              <strong>1.1 M</strong>
              <span>MAX MUD DEPTH</span>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">◷</div>

            <div>
              <strong>6:42</strong>
              <span>AVG LAP TIME</span>
            </div>
          </div>
        </div>

        {/* =========================================
            NEXT SECTION
        ========================================= */}

        <div className="next-events">
          <span>NEXT: EVENTS</span>

          <span>→</span>
        </div>
      </div>
    </section>
  );
}

export default Second;
