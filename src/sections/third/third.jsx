import { useEffect, useRef, useState } from "react";
import "./Third.css";

/* =========================================================
   BIKE ASSETS
========================================================= */

import ktmVideo from "../../assets/ktm video.webm";

import ktmIcon from "../../assets/KTM ICON.png";
import xpulseIcon from "../../assets/XPULSE ICON.png";
import yamahaIcon from "../../assets/YAMAHA ICON.png";
import kawasakiIcon from "../../assets/KAWAZAKI ICON.png";

/* =========================================================
   BIKE DATA
========================================================= */

const BIKES = [
  {
    id: 1,
    name: "KTM 123",

    video: ktmVideo,
    icon: ktmIcon,

    specs: "124cc  •  2-STROKE  •  15 HP",
    price: "RENT FROM ₹1200 / DAY",

    headingLine1: "BUILT TO ATTACK.",
    headingLine2: "MADE FOR THE MUD.",

    description:
      "Light, aggressive and ready for anything. The KTM 123 is built for riders who want sharp control, quick response and pure dirt-track energy.",
  },

  {
    id: 2,
    name: "XPULSE 200",

    video: ktmVideo,
    icon: xpulseIcon,

    specs: "199cc  •  4-STROKE  •  18 HP",
    price: "RENT FROM ₹1400 / DAY",

    headingLine1: "BUILT TO EXPLORE.",
    headingLine2: "MADE FOR EVERY TERRAIN.",

    description:
      "A versatile machine made for riders who want confidence beyond the ordinary. Smooth power, strong control and enough attitude for the dirt.",
  },

  {
    id: 3,
    name: "YAMAHA YZ85",

    video: ktmVideo,
    icon: yamahaIcon,

    specs: "85cc  •  2-STROKE  •  28 HP",
    price: "RENT FROM ₹1100 / DAY",

    headingLine1: "LIGHT. QUICK.",
    headingLine2: "BUILT TO MASTER.",

    description:
      "Small in size but serious on the track. The YZ85 delivers quick acceleration, sharp handling and the confidence to attack every corner.",
  },

  {
    id: 4,
    name: "KAWASAKI KX250",

    video: ktmVideo,
    icon: kawasakiIcon,

    specs: "249cc  •  2-STROKE  •  44 HP",
    price: "RENT FROM ₹1600 / DAY",

    headingLine1: "RAW POWER.",
    headingLine2: "BUILT TO DOMINATE.",

    description:
      "A powerful track machine designed for riders who want aggressive performance, explosive acceleration and complete control in the dirt.",
  },
];

/* =========================================================
   MATRIX SCRAMBLE
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

      const revealedCount = Math.floor(progress * originalText.length);

      let output = "";

      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " ") {
          output += " ";
          continue;
        }

        if (i < revealedCount) {
          output += originalText[i];
        } else {
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

function Third({ id }) {
  const [currentBike, setCurrentBike] = useState(0);

  const [isChanging, setIsChanging] = useState(false);

  const [videoAnimation, setVideoAnimation] = useState("");

  const videoRef = useRef(null);

  const bike = BIKES[currentBike];

  /* =========================================================
     CHANGE BIKE
  ========================================================= */

  const changeBike = (newBike) => {
    if (newBike === currentBike || isChanging) {
      return;
    }

    setIsChanging(true);

    /* -----------------------------------------
       OLD BIKE EXIT
    ----------------------------------------- */

    setVideoAnimation("bike-video-exit");

    /*
      Wait for exit animation
    */

    setTimeout(() => {
      setCurrentBike(newBike);

      /* -----------------------------------------
         NEW BIKE ENTER
      ----------------------------------------- */

      setVideoAnimation("bike-video-enter");

      setTimeout(() => {
        setVideoAnimation("");
        setIsChanging(false);
      }, 750);
    }, 750);
  };

  /* =========================================================
     VIDEO PLAYBACK
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    /*
      Restart the same KTM video every time
      a different bike is selected.
    */

    video.currentTime = 0;

    video.play().catch((error) => {
      console.log("Autoplay was prevented:", error);
    });
  }, [currentBike]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section ref={null} id={id} className="garage-section">
      <div className="garage-sticky">
        {/* =========================================
            HEADER
        ========================================= */}

        <header className="garage-header">
          {/* LOGO */}

          <div className="garage-logo">
            MUDVAULT.
            <span>DIRT TRACK COMPANY</span>
          </div>

          {/* NAVIGATION */}

          <nav className="garage-nav">
            <a href="#track">TRACK</a>
            <a href="#events">EVENTS</a>
            <a href="#about">ABOUT</a>
            <a href="#gallery">GALLERY</a>
            <a href="#contact">CONTACT</a>

            <button className="garage-menu" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </header>

        {/* =========================================
            MAIN TITLE
        ========================================= */}

        <h1 className="garage-title">GARAGE</h1>

        {/* =========================================
            DESCRIPTION / SCRAMBLE TEXT
        ========================================= */}

        <div
          key={`description-${currentBike}`}
          className="garage-description garage-text-reveal"
        >
          <h2>
            <ScrambleText text={bike.headingLine1} duration={500} />

            <br />

            <ScrambleText text={bike.headingLine2} duration={650} />
          </h2>

          <div className="garage-small-line"></div>

          <p>
            <ScrambleText text={bike.description} duration={900} />
          </p>
        </div>

        {/* =========================================
            MAIN BIKE VIDEO
        ========================================= */}

        <div
          key={`video-${currentBike}`}
          className={`garage-bike-wrapper ${videoAnimation}`}
        >
          <video
            ref={videoRef}
            className="garage-bike-video"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src={bike.video} type="video/webm" />
          </video>
        </div>

        {/* =========================================
            BIKE LIST
        ========================================= */}

        <div className="garage-bike-list">
          {BIKES.map((item, index) => (
            <button
              key={item.id}
              className={`bike-card ${currentBike === index ? "active" : ""}`}
              onClick={() => changeBike(index)}
              disabled={isChanging}
            >
              {/* NUMBER */}

              <div className="bike-number">
                <span>0{item.id}</span>

                <i></i>
              </div>

              {/* BIKE INFORMATION */}

              <div className="bike-info">
                <h2>{item.name}</h2>

                <p>{item.specs}</p>

                <div className="bike-price">{item.price}</div>
              </div>

              {/* BIKE ICON */}

              <div className="bike-icon">
                <img src={item.icon} alt={item.name} />
              </div>

              {/* PLUS */}

              <span className="bike-plus">+</span>
            </button>
          ))}
        </div>

        {/* =========================================
            BOTTOM LEFT
        ========================================= */}

        <div className="garage-bottom-left">
          <span>NEED GEAR TOO?</span>

          <strong>CHECK OUT OUR RIDING GEAR</strong>

          <span className="gear-arrow">→</span>
        </div>

        {/* =========================================
            PAGINATION
        ========================================= */}

        <div className="garage-pagination">
          <button
            onClick={() =>
              changeBike(currentBike === 0 ? BIKES.length - 1 : currentBike - 1)
            }
            disabled={isChanging}
          >
            ←
          </button>

          <span>
            0{currentBike + 1} / 0{BIKES.length}
          </span>

          <button
            onClick={() =>
              changeBike(currentBike === BIKES.length - 1 ? 0 : currentBike + 1)
            }
            disabled={isChanging}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Third;
