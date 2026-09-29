import { useEffect, useMemo, useRef, useState } from "react";
import "./Fourth.css";

import riderVideo from "../../assets/man.webm";
import helmetVideo from "../../assets/helmet.webm";

/* =========================================================
   FINAL HOTSPOT POSITIONS
========================================================= */

const HOTSPOTS = {
  helmet: {
    label: "HELMET",
    product: "helmet",

    left: 35.89,
    top: 1.16,
    width: 27.34,
    height: 18.24,
  },

  vest: {
    label: "VEST / CHEST",
    product: "vest",

    left: 38.69,
    top: 19.53,
    width: 22.38,
    height: 17.3,
  },

  gloveLeft: {
    label: "LEFT GLOVE",
    product: "gloves",

    left: 29.89,
    top: 44.7,
    width: 13.66,
    height: 13.99,
  },

  gloveRight: {
    label: "RIGHT GLOVE",
    product: "gloves",

    left: 60.43,
    top: 44.45,
    width: 13.66,
    height: 13.99,
  },

  knee: {
    label: "KNEE GUARD",
    product: "knee",

    left: 39.36,
    top: 61.0,
    width: 25.61,
    height: 11.25,
  },

  boots: {
    label: "BOOTS",
    product: "boots",

    left: 31.48,
    top: 77.13,
    width: 36.41,
    height: 20.09,
  },
};

/* =========================================================
   PRODUCT DATA
========================================================= */

const KIT_DATA = {
  helmet: {
    id: "helmet",
    name: "RACE HELMET",
    kicker: "HEAD PROTECTION / 01",

    mediaType: "video",
    media: helmetVideo,

    heading: "BUILT FOR IMPACT.",

    description:
      "The MudVault race helmet is designed as a complete head-protection system for demanding off-road environments. Its full-coverage profile combines a protective outer shell, secure retention and an open field of vision to keep the rider focused through high-speed sections, jumps, corners and unpredictable terrain. Ventilation channels are integrated into the overall form to encourage airflow while maintaining a compact race-focused silhouette. Every element of the concept is shaped around stability, visibility and confidence when the pace increases.",

    specs: [
      ["SHELL", "IMPACT-RESISTANT CONSTRUCTION"],
      ["VISION", "WIDE FIELD OF VIEW"],
      ["RETENTION", "SECURE CHIN-STRAP SYSTEM"],
      ["VENTILATION", "AIRFLOW-FOCUSED CHANNELS"],
    ],
  },

  vest: {
    id: "vest",
    name: "PROTECTIVE VEST",
    kicker: "TORSO PROTECTION / 02",

    mediaType: "placeholder",

    heading: "ENGINEERED FOR THE CORE.",

    description:
      "The MudVault protective vest is conceived as a lightweight torso-protection system that combines coverage with unrestricted rider movement. The structure is designed to sit securely against the chest and back while allowing the rider to shift naturally between standing, cornering and aggressive riding positions. Its low-profile construction keeps the protective zones close to the body, reducing unnecessary movement while maintaining the mobility required for technical off-road riding.",

    specs: [
      ["COVERAGE", "CHEST + BACK PROTECTION"],
      ["FIT", "SECURE LOW-MOVEMENT PROFILE"],
      ["MOBILITY", "FLEXIBLE RIDER POSITION"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],
  },

  gloves: {
    id: "gloves",
    name: "RACE GLOVES",
    kicker: "HAND PROTECTION / 03",

    mediaType: "placeholder",

    heading: "CONTROL UNDER PRESSURE.",

    description:
      "The MudVault race gloves are designed around the constant interaction between rider, handlebar and controls. The construction focuses on maintaining grip while allowing the fingers and wrist to move naturally during braking, acceleration and technical manoeuvres. Protective zones are positioned around exposed areas of the hand, while the flexible profile helps preserve tactile control and comfort during extended riding sessions.",

    specs: [
      ["PALM", "HIGH-GRIP SURFACE"],
      ["KNUCKLES", "IMPACT-COVERAGE ZONE"],
      ["CUFF", "SECURE WRIST CLOSURE"],
      ["CONTROL", "FLEXIBLE FINGER MOVEMENT"],
    ],
  },

  knee: {
    id: "knee",
    name: "KNEE GUARDS",
    kicker: "LEG PROTECTION / 04",

    mediaType: "placeholder",

    heading: "PROTECT THE LINE.",

    description:
      "The MudVault knee guards are developed around one of the most active areas of the rider's body. The protective profile is positioned to cover the knee and surrounding impact zone while allowing repeated flexion through corners, jumps and technical sections. A secure retention concept keeps the guard positioned as the rider moves, while the streamlined shape is intended to work naturally with motocross riding gear.",

    specs: [
      ["COVERAGE", "KNEE IMPACT ZONE"],
      ["MOBILITY", "FLEXION-FRIENDLY PROFILE"],
      ["RETENTION", "SECURE STRAP SYSTEM"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],
  },

  boots: {
    id: "boots",
    name: "RACE BOOTS",
    kicker: "FOOT + ANKLE / 05",

    mediaType: "placeholder",

    heading: "LOCKED TO THE BIKE.",

    description:
      "The MudVault race boots are designed to provide structured protection around the foot, ankle and lower leg while maintaining the movement required for active riding. The construction concept focuses on stability around the ankle and controlled interaction with the motorcycle, particularly through foot positioning, braking and aggressive terrain changes. A reinforced riding profile completes the system with a balance between protection, support and rider control.",

    specs: [
      ["ANKLE", "STRUCTURAL SUPPORT"],
      ["FOOT", "IMPACT-COVERAGE ZONE"],
      ["SOLE", "RIDING-FOCUSED GRIP"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],
  },
};

/* =========================================================
   HOTSPOT
========================================================= */

function Hotspot({ hotspot, onSelect }) {
  return (
    <button
      type="button"
      className="kit-hotspot"
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onClick={() => onSelect(hotspot.product)}
      aria-label={hotspot.label}
    />
  );
}

/* =========================================================
   FOURTH PAGE
========================================================= */

function Fourth({ id }) {
  const [activeKit, setActiveKit] = useState("helmet");

  const riderRef = useRef(null);

  const kit = useMemo(() => KIT_DATA[activeKit], [activeKit]);

  /* =========================================================
     RIDER VIDEO AUTOPLAY
  ========================================================= */

  useEffect(() => {
    const video = riderRef.current;

    if (!video) return;

    video.play().catch(() => {
      console.log("Autoplay was prevented by the browser.");
    });
  }, []);

  return (
    <section id={id} className="race-kit-section">
      <div className="race-kit-page">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="race-kit-header">
          <div className="race-kit-logo">
            <strong>MUDVAULT</strong>
            <span>DIRT TRACK EQUIPMENT</span>
          </div>

          <nav className="race-kit-nav">
            <a href="#track">TRACK</a>
            <a href="#events">EVENTS</a>
            <a href="#about">ABOUT</a>
            <a href="#gallery">GALLERY</a>
            <a href="#contact">CONTACT</a>

            <button className="race-kit-menu" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </nav>
        </header>

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="race-kit-left">
          <div className="race-kit-title">
            <span>RACE</span>
            <span>KIT</span>
          </div>

          <div className="race-kit-copy">
            <h2>
              BUILT TO
              <br />
              ENDURE.
              <br />
              MADE TO
              <br />
              RIDE.
            </h2>

            <div className="orange-line" />

            <p>
              HIGH-PERFORMANCE GEAR DESIGNED FOR CONTROL, PROTECTION AND TOTAL
              FREEDOM ON ANY TERRAIN.
            </p>

            <button className="race-kit-button">
              <span>EXPLORE THE KIT</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* =================================================
            CENTER RIDER
        ================================================= */}

        <div className="kit-rider-stage">
          <video
            ref={riderRef}
            className="kit-rider-video"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src={riderVideo} type="video/webm" />
          </video>

          {/* INVISIBLE HOTSPOTS */}

          <div className="hotspot-layer">
            {Object.entries(HOTSPOTS).map(([key, hotspot]) => (
              <Hotspot key={key} hotspot={hotspot} onSelect={setActiveKit} />
            ))}
          </div>
        </div>

        {/* =================================================
            RIGHT PRODUCT AREA
        ================================================= */}

        <aside className="kit-product-panel">
          {/* =================================================
              SEPARATE PRODUCT VIDEO / MEDIA ELEMENT
          ================================================= */}

          <div className="kit-product-media">
            {kit.mediaType === "video" ? (
              <video
                className="product-video"
                key={kit.media}
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              >
                <source src={kit.media} type="video/webm" />
              </video>
            ) : (
              <div className="product-placeholder">
                <span>{kit.name}</span>

                <small>MEDIA PLACEHOLDER</small>
              </div>
            )}
          </div>

          {/* =================================================
              SEPARATE PRODUCT INFORMATION ELEMENT
          ================================================= */}

          <div className="kit-product-info" key={kit.id}>
            <span className="product-kicker">{kit.kicker}</span>

            <h2>{kit.name}</h2>

            <div className="orange-line" />

            <h3>{kit.heading}</h3>

            {/* PROJECT DESCRIPTION */}

            <div className="project-description">
              {/*<span className="description-label">PROJECT DESCRIPTION</span>*/}

              <p>{kit.description}</p>
            </div>

            {/* PRODUCT SPECIFICATIONS */}

            <div className="kit-specs">
              {kit.specs.map(([label, value]) => (
                <div className="kit-spec" key={label}>
                  <span>{label}</span>

                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* =================================================
            PAGE NUMBER
        ================================================= */}

        <div className="kit-page-index">
          <span>04</span>

          <i />

          <span>RACE EQUIPMENT</span>
        </div>
      </div>
    </section>
  );
}

export default Fourth;
