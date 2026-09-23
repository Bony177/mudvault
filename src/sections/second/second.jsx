import { useEffect, useRef, useState } from "react";

import "./Second.css";

import trackVideo01 from "../../assets/track01.webm";
import trackVideo02 from "../../assets/track02.webm";

import trackMap01 from "../../assets/track01.png";
import trackMap02 from "../../assets/track02.png";

/* =========================================================
   TRACK DATA
========================================================= */

const TRACKS = [
  {
    id: 1,
    title: "TRACK 01",

    video: trackVideo01,
    map: trackMap01,

    heading: (
      <>
        BUILT FOR CHAOS.
        <br />
        MADE FOR CONTROL.
      </>
    ),

    description:
      "A next-level dirt experience designed to test every part of you and your machine. Tight turns, brutal climbs, and unpredictable terrain keep you locked in from the first corner to the final lap. Every turn has a purpose. Every lap tells a story.",

    stats: {
      length: "3.8 KM",
      elevation: "64 M",
      obstacles: "23+",
      lapTime: "6:42",
    },
  },

  {
    id: 2,
    title: "TRACK 02",

    video: trackVideo02,
    map: trackMap02,

    heading: (
      <>
        BUILT FOR SPEED.
        <br />
        MADE FOR PRECISION.
      </>
    ),

    description:
      "A faster and more technical route built around sharp corners, heavy jumps, and demanding elevation changes. Track 02 rewards precision and commitment, pushing both rider and machine through every section.",

    stats: {
      length: "4.2 KM",
      elevation: "71 M",
      obstacles: "27+",
      lapTime: "6:18",
    },
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function Second({ id }) {
  /* =========================================================
     STATE / REFS
  ========================================================= */

  const videoRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const track = TRACKS[currentTrack];

  /* =========================================================
     CHANGE TRACK
  ========================================================= */

  const changeTrack = (newTrack) => {
    if (newTrack === currentTrack || isTransitioning) return;

    // Start exit animation
    setIsTransitioning(true);

    // Wait for the old content to leave
    setTimeout(() => {
      setCurrentTrack(newTrack);

      // Give React time to render the new track
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 450);
  };

  /* =========================================================
     VIDEO PLAYBACK
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Start the new track video from the beginning
    video.currentTime = 0;

    video.play().catch((error) => {
      console.log("Autoplay was prevented:", error);
    });
  }, [currentTrack]);

  /* =========================================================
     SCROLL / WHEEL DETECTION
  ========================================================= */

  useEffect(() => {
    const handleWheel = (event) => {
      if (isTransitioning) return;

      /* -----------------------------------------
         SCROLL DOWN
         Track 01 → Track 02
      ----------------------------------------- */

      if (event.deltaY > 0 && currentTrack === 0) {
        changeTrack(1);
      }

      /* -----------------------------------------
         SCROLL UP
         Track 02 → Track 01
      ----------------------------------------- */

      if (event.deltaY < 0 && currentTrack === 1) {
        changeTrack(0);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentTrack, isTransitioning]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section id={id} className="track-section">
      <div className="track-sticky">
        {/* =========================================
            HEADER
        ========================================= */}

        <header className="track-header"></header>

        {/* =========================================
            CHANGING TRACK CONTENT
        ========================================= */}

        <div
          key={currentTrack}
          className={`track-content ${
            isTransitioning ? "track-content-exit" : "track-content-enter"
          }`}
        >
          {/* =========================================
              MAIN TITLE
          ========================================= */}

          <h1 className="track-title">{track.title}</h1>

          {/* =========================================
              TRACK MAP
          ========================================= */}

          <div className="track-map">
            <div className="section-label">
              <span>TRACK MAP</span>
              <i></i>
            </div>

            <img src={track.map} alt={`${track.title} map`} />
          </div>

          {/* =========================================
              TRACK VIDEO
          ========================================= */}

          <div className="track-video-wrapper">
            <video
              ref={videoRef}
              className="track-video"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            >
              <source src={track.video} type="video/webm" />
            </video>
          </div>

          {/* =========================================
              DESCRIPTION
          ========================================= */}

          <div className="track-description">
            <h2>{track.heading}</h2>

            <div className="small-line"></div>

            <p>{track.description}</p>
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
            {/* LENGTH */}

            <div className="stat">
              <div className="stat-icon">◈</div>

              <div>
                <strong>{track.stats.length}</strong>

                <span>TRACK LENGTH</span>
              </div>
            </div>

            {/* ELEVATION */}

            <div className="stat">
              <div className="stat-icon">△</div>

              <div>
                <strong>{track.stats.elevation}</strong>

                <span>ELEVATION GAIN</span>
              </div>
            </div>

            {/* OBSTACLES */}

            <div className="stat">
              <div className="stat-icon">⚑</div>

              <div>
                <strong>{track.stats.obstacles}</strong>

                <span>OBSTACLES</span>
              </div>
            </div>

            {/* LAP TIME */}

            <div className="stat">
              <div className="stat-icon">◷</div>

              <div>
                <strong>{track.stats.lapTime}</strong>

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
      </div>
    </section>
  );
}

export default Second;
