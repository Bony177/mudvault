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
      "A race-focused helmet concept built around full head coverage, secure retention and a wide field of vision. The design prioritizes impact management, ventilation and rider visibility.",

    specs: [
      ["SHELL", "IMPACT-RESISTANT CONSTRUCTION"],
      ["VISION", "WIDE FIELD OF VIEW"],
      ["RETENTION", "SECURE CHIN-STRAP SYSTEM"],
      ["VENTILATION", "AIRFLOW-FOCUSED CHANNELS"],
    ],

    drawingLabel: "HELMET / TECHNICAL VIEW",
  },

  vest: {
    id: "vest",
    name: "PROTECTIVE VEST",
    kicker: "TORSO PROTECTION / 02",

    mediaType: "placeholder",

    heading: "ENGINEERED FOR THE CORE.",

    description:
      "A race-armor concept for the torso, designed around impact coverage, mobility and a secure fit while keeping the rider's movement unrestricted.",

    specs: [
      ["COVERAGE", "CHEST + BACK PROTECTION"],
      ["FIT", "SECURE LOW-MOVEMENT PROFILE"],
      ["MOBILITY", "FLEXIBLE RIDER POSITION"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],

    drawingLabel: "VEST / TECHNICAL VIEW",
  },

  gloves: {
    id: "gloves",
    name: "RACE GLOVES",
    kicker: "HAND PROTECTION / 03",

    mediaType: "placeholder",

    heading: "CONTROL UNDER PRESSURE.",

    description:
      "A motocross glove concept focused on grip, hand coverage and controlled movement around the levers and handlebars.",

    specs: [
      ["PALM", "HIGH-GRIP SURFACE"],
      ["KNUCKLES", "IMPACT-COVERAGE ZONE"],
      ["CUFF", "SECURE WRIST CLOSURE"],
      ["CONTROL", "FLEXIBLE FINGER MOVEMENT"],
    ],

    drawingLabel: "GLOVES / TECHNICAL VIEW",
  },

  knee: {
    id: "knee",
    name: "KNEE GUARDS",
    kicker: "LEG PROTECTION / 04",

    mediaType: "placeholder",

    heading: "PROTECT THE LINE.",

    description:
      "A knee-protection concept intended to cover the knee area while allowing the repeated flexion required during aggressive off-road riding.",

    specs: [
      ["COVERAGE", "KNEE IMPACT ZONE"],
      ["MOBILITY", "FLEXION-FRIENDLY PROFILE"],
      ["RETENTION", "SECURE STRAP SYSTEM"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],

    drawingLabel: "KNEE GUARD / TECHNICAL VIEW",
  },

  boots: {
    id: "boots",
    name: "RACE BOOTS",
    kicker: "FOOT + ANKLE / 05",

    mediaType: "placeholder",

    heading: "LOCKED TO THE BIKE.",

    description:
      "A motocross boot concept focused on ankle stability, foot coverage and protection around the lower leg and foot during off-road riding.",

    specs: [
      ["ANKLE", "STRUCTURAL SUPPORT"],
      ["FOOT", "IMPACT-COVERAGE ZONE"],
      ["SOLE", "RIDING-FOCUSED GRIP"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],

    drawingLabel: "BOOT / TECHNICAL VIEW",
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

  /* =========================================================
     RENDER
  ========================================================= */

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

          {/* ===============================================
              INVISIBLE HOTSPOTS
          =============================================== */}

          <div className="hotspot-layer">
            {Object.entries(HOTSPOTS).map(([key, hotspot]) => (
              <Hotspot key={key} hotspot={hotspot} onSelect={setActiveKit} />
            ))}
          </div>
        </div>

        {/* =================================================
            RIGHT PRODUCT PANEL
        ================================================= */}

        <aside className="kit-product-panel">
          {/* ===============================================
              PRODUCT MEDIA
          =============================================== */}

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

          {/* ===============================================
              PRODUCT INFORMATION
          =============================================== */}

          <div className="kit-product-info" key={kit.id}>
            <span className="product-kicker">{kit.kicker}</span>

            <h2>{kit.name}</h2>

            <div className="orange-line" />

            <h3>{kit.heading}</h3>

            <p>{kit.description}</p>

            {/* =============================================
                PRODUCT SPECS
            ============================================= */}

            <div className="kit-specs">
              {kit.specs.map(([label, value]) => (
                <div className="kit-spec" key={label}>
                  <span>{label}</span>

                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            {/* =============================================
                TECHNICAL DRAWING PLACEHOLDER
            ============================================= */}

            <div className="technical-drawing">
              <div className="drawing-grid" />

              <div className="drawing-placeholder">
                <span>TECHNICAL DRAWING</span>

                <strong>{kit.drawingLabel}</strong>

                <i />
              </div>
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
