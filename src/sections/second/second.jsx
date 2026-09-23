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

    headingLine1: "BUILT FOR CHAOS.",
    headingLine2: "MADE FOR CONTROL.",

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

    headingLine1: "BUILT FOR SPEED.",
    headingLine2: "MADE FOR PRECISION.",

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
   MATRIX SCRAMBLE TEXT
========================================================= */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*@";

function ScrambleText({ text, duration = 500, className = "" }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame;
    let startTime;

    const originalText = text;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);

      /*
        How many characters should already
        be revealed.
      */
      const revealedCount = Math.floor(progress * originalText.length);

      let output = "";

      for (let i = 0; i < originalText.length; i++) {
        /*
          Spaces remain spaces.
        */

        if (originalText[i] === " ") {
          output += " ";
          continue;
        }

        /*
          Characters before the reveal point
          become the real character.
        */

        if (i < revealedCount) {
          output += originalText[i];
        } else {
          /*
          Remaining characters are random.
        */
          const randomChar =
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

          output += randomChar;
        }
      }

      setDisplayText(output);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayText(originalText);
      }
    };

    setDisplayText(
      originalText
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        )
        .join(""),
    );

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [text, duration]);

  return <span className={className}>{displayText}</span>;
}

/* =========================================================
   COMPONENT
========================================================= */

function Second({ id }) {
  /* =========================================================
     STATE
  ========================================================= */

  const [currentTrack, setCurrentTrack] = useState(0);

  const [isChanging, setIsChanging] = useState(false);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [videoAnimation, setVideoAnimation] = useState("");

  /* =========================================================
     REFS
  ========================================================= */

  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);

  /* =========================================================
     CURRENT TRACK
  ========================================================= */

  const track = TRACKS[currentTrack];

  /* =========================================================
     CHANGE TRACK
  ========================================================= */

  const changeTrack = (newTrack) => {
    if (newTrack === currentTrack || isChanging) {
      return;
    }

    setIsChanging(true);

    /*
      FIRST:
      Animate ONLY the video out.
    */

    setVideoAnimation("video-exit");

    /*
      Wait until exit animation finishes.
    */

    setTimeout(() => {
      /*
        Change the track data.
      */

      setCurrentTrack(newTrack);

      /*
        Start the new video from below.
      */

      setVideoAnimation("video-enter");

      /*
        Allow another scroll after
        the enter animation finishes.
      */

      setTimeout(() => {
        setVideoAnimation("");

        setIsChanging(false);
      }, 800);
    }, 800);
  };

  /* =========================================================
     VIDEO PLAYBACK
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    video.play().catch((error) => {
      console.log("Autoplay was prevented:", error);
    });
  }, [currentTrack]);

  /* =========================================================
     SCROLL DETECTION
  ========================================================= */
  useEffect(() => {
    const sticky = stickyRef.current;

    if (!sticky) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionActive(entry.intersectionRatio >= 0.95);
      },
      {
        threshold: [0, 0.95, 1],
      },
    );

    observer.observe(sticky);

    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const handleWheel = (event) => {
      /*
      DON'T DO ANYTHING WHILE:
      - section isn't fully visible
      - animation is running
    */

      if (!isSectionActive || isChanging) {
        return;
      }

      /* =========================================
       SCROLL DOWN
       TRACK 01 → TRACK 02
    ========================================= */

      if (event.deltaY > 0 && currentTrack === 0) {
        changeTrack(1);
      }

      /* =========================================
       SCROLL UP
       TRACK 02 → TRACK 01
    ========================================= */

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
  }, [currentTrack, isChanging, isSectionActive]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section ref={sectionRef} id={id} className="track-section">
      <div ref={stickyRef} className="track-sticky">
        {/* =========================================
            HEADER
        ========================================= */}

        <header className="track-header"></header>

        {/* =========================================
            MAIN TITLE
        ========================================= */}

        <h1
          key={`title-${currentTrack}`}
          className="track-title track-text-reveal"
        >
          <ScrambleText text={track.title} duration={550} />
        </h1>

        {/* =========================================
            TRACK MAP
        ========================================= */}

        <div key={`map-${currentTrack}`} className="track-map track-map-change">
          <div className="section-label">
            <span>TRACK MAP</span>

            <i></i>
          </div>

          <img src={track.map} alt={`${track.title} map`} />
        </div>

        {/* =========================================
            TRACK VIDEO
        ========================================= */}

        <div className={`track-video-wrapper ${videoAnimation}`}>
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

        <div
          key={`description-${currentTrack}`}
          className="track-description track-text-reveal"
        >
          <h2>
            <ScrambleText text={track.headingLine1} duration={500} />

            <br />

            <ScrambleText text={track.headingLine2} duration={650} />
          </h2>

          <div className="small-line"></div>

          <p>
            <ScrambleText text={track.description} duration={900} />
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

        <div
          key={`stats-${currentTrack}`}
          className="track-stats track-stats-change"
        >
          {/* LENGTH */}

          <div className="stat">
            <div className="stat-icon">◈</div>

            <div>
              <strong>
                <ScrambleText text={track.stats.length} duration={350} />
              </strong>

              <span>TRACK LENGTH</span>
            </div>
          </div>

          {/* ELEVATION */}

          <div className="stat">
            <div className="stat-icon">△</div>

            <div>
              <strong>
                <ScrambleText text={track.stats.elevation} duration={400} />
              </strong>

              <span>ELEVATION GAIN</span>
            </div>
          </div>

          {/* OBSTACLES */}

          <div className="stat">
            <div className="stat-icon">⚑</div>

            <div>
              <strong>
                <ScrambleText text={track.stats.obstacles} duration={450} />
              </strong>

              <span>OBSTACLES</span>
            </div>
          </div>

          {/* LAP TIME */}

          <div className="stat">
            <div className="stat-icon">◷</div>

            <div>
              <strong>
                <ScrambleText text={track.stats.lapTime} duration={500} />
              </strong>

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
