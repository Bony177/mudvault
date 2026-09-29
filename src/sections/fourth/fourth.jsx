import { useEffect, useMemo, useRef, useState } from "react";
import "./Fourth.css";

import riderVideo from "../../assets/man.webm";
import helmetVideo from "../../assets/helmet.webm";

/*
  ============================================================
  MUDVAULT — RACE KIT / FOURTH PAGE

  DEVELOPMENT MODE
  ----------------
  Keep DEBUG_MODE = true while positioning the hotspots.

  Each orange box can be dragged around the rider.
  The selected box's percentage coordinates are shown on the
  right side of the page.

  When everything is positioned correctly:
      const DEBUG_MODE = false;

  The boxes will become invisible clickable/touchable areas.
  ============================================================
*/

const DEBUG_MODE = true;

const INITIAL_HOTSPOTS = {
  helmet: {
    label: "HELMET",
    left: 47,
    top: 6,
    width: 12,
    height: 17,
  },

  vest: {
    label: "VEST / CHEST",
    left: 42,
    top: 24,
    width: 20,
    height: 25,
  },

  gloves: {
    label: "GLOVES",
    left: 32,
    top: 37,
    width: 36,
    height: 13,
  },

  knee: {
    label: "KNEE",
    left: 42,
    top: 61,
    width: 19,
    height: 12,
  },

  boots: {
    label: "BOOTS",
    left: 41,
    top: 78,
    width: 22,
    height: 15,
  },
};

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
      "A placeholder race-armor concept for the torso, designed around impact coverage, mobility and a secure fit while keeping the rider's movement unrestricted.",

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
      "A placeholder motocross glove concept focused on grip, hand coverage and controlled movement around the levers and handlebars.",

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
      "A placeholder knee-protection concept intended to cover the knee area while allowing the repeated flexion required during aggressive off-road riding.",

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
      "A placeholder motocross boot concept focused on ankle stability, foot coverage and protection around the lower leg and foot during off-road riding.",

    specs: [
      ["ANKLE", "STRUCTURAL SUPPORT"],
      ["FOOT", "IMPACT-COVERAGE ZONE"],
      ["SOLE", "RIDING-FOCUSED GRIP"],
      ["USE", "OFF-ROAD / MOTOCROSS"],
    ],

    drawingLabel: "BOOT / TECHNICAL VIEW",
  },
};

function HotspotBox({
  id,
  hotspot,
  debugMode,
  selected,
  onSelect,
  onMove,
  onResize,
}) {
  const dragRef = useRef(null);

  const startMove = (event) => {
    if (!debugMode) return;

    event.preventDefault();
    event.stopPropagation();

    onSelect(id);

    dragRef.current = {
      type: "move",
      pointerX: event.clientX,
      pointerY: event.clientY,
      initialLeft: hotspot.left,
      initialTop: hotspot.top,
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopPointer);
  };

  const startResize = (event) => {
    if (!debugMode) return;

    event.preventDefault();
    event.stopPropagation();

    onSelect(id);

    dragRef.current = {
      type: "resize",
      pointerX: event.clientX,
      pointerY: event.clientY,
      initialWidth: hotspot.width,
      initialHeight: hotspot.height,
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopPointer);
  };

  const handlePointerMove = (event) => {
    const stage = document.querySelector(".kit-rider-stage");
    const drag = dragRef.current;

    if (!stage || !drag) return;

    const rect = stage.getBoundingClientRect();

    const deltaX = ((event.clientX - drag.pointerX) / rect.width) * 100;
    const deltaY = ((event.clientY - drag.pointerY) / rect.height) * 100;

    if (drag.type === "move") {
      onMove(id, {
        left: Math.max(
          0,
          Math.min(100 - hotspot.width, drag.initialLeft + deltaX),
        ),
        top: Math.max(
          0,
          Math.min(100 - hotspot.height, drag.initialTop + deltaY),
        ),
      });
    }

    if (drag.type === "resize") {
      onResize(id, {
        width: Math.max(3, Math.min(70, drag.initialWidth + deltaX)),
        height: Math.max(3, Math.min(70, drag.initialHeight + deltaY)),
      });
    }
  };

  const stopPointer = () => {
    dragRef.current = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", stopPointer);
  };

  return (
    <button
      type="button"
      className={`kit-hotspot ${selected ? "is-selected" : ""}`}
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onPointerDown={startMove}
      onClick={(event) => {
        event.stopPropagation();
        if (!debugMode) onSelect(id);
      }}
      aria-label={`Select ${hotspot.label}`}
    >
      <span className="hotspot-label">{hotspot.label}</span>

      {debugMode && (
        <span
          className="hotspot-resize"
          onPointerDown={startResize}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

function Fourth({ id }) {
  const [activeKit, setActiveKit] = useState("helmet");
  const [selectedHotspot, setSelectedHotspot] = useState("helmet");
  const [hotspots, setHotspots] = useState(INITIAL_HOTSPOTS);
  const [copied, setCopied] = useState(false);

  const riderRef = useRef(null);

  const kit = useMemo(() => KIT_DATA[activeKit], [activeKit]);

  useEffect(() => {
    const video = riderRef.current;

    if (!video) return;

    video.play().catch(() => {
      // Browser autoplay policies may block playback until interaction.
    });
  }, []);

  const updateHotspot = (id, changes) => {
    setHotspots((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...changes,
      },
    }));
  };

  const selectKit = (id) => {
    setSelectedHotspot(id);
    setActiveKit(id);
  };

  const copySelectedCoordinates = async () => {
    const hotspot = hotspots[selectedHotspot];

    const output = {
      [selectedHotspot]: {
        left: `${hotspot.left.toFixed(2)}%`,
        top: `${hotspot.top.toFixed(2)}%`,
        width: `${hotspot.width.toFixed(2)}%`,
        height: `${hotspot.height.toFixed(2)}%`,
      },
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1200);
    } catch {
      console.log(output);
    }
  };

  const copyAllCoordinates = async () => {
    const output = Object.fromEntries(
      Object.entries(hotspots).map(([key, value]) => [
        key,
        {
          left: `${value.left.toFixed(2)}%`,
          top: `${value.top.toFixed(2)}%`,
          width: `${value.width.toFixed(2)}%`,
          height: `${value.height.toFixed(2)}%`,
        },
      ]),
    );

    try {
      await navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1200);
    } catch {
      console.log(output);
    }
  };

  return (
    <section id={id} className="race-kit-section">
      <div className={`race-kit-page ${DEBUG_MODE ? "debug-mode" : ""}`}>
        {/* =====================================================
            HEADER
        ===================================================== */}

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

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

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
              HIGH-PERFORMANCE GEAR DESIGNED FOR
              <br />
              CONTROL, PROTECTION AND TOTAL
              <br />
              FREEDOM ON ANY TERRAIN.
            </p>

            <button className="race-kit-button">
              <span>EXPLORE THE KIT</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* =====================================================
            CENTER RIDER + HOTSPOTS
        ===================================================== */}

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

          <div className="hotspot-layer">
            {Object.entries(hotspots).map(([key, hotspot]) => (
              <HotspotBox
                key={key}
                id={key}
                hotspot={hotspot}
                debugMode={DEBUG_MODE}
                selected={selectedHotspot === key}
                onSelect={selectKit}
                onMove={(hotspotId, changes) =>
                  updateHotspot(hotspotId, changes)
                }
                onResize={(hotspotId, changes) =>
                  updateHotspot(hotspotId, changes)
                }
              />
            ))}
          </div>
        </div>

        {/* =====================================================
            RIGHT PRODUCT PANEL
        ===================================================== */}

        <aside className="kit-product-panel">
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

          <div className="kit-product-info" key={kit.id}>
            <span className="product-kicker">{kit.kicker}</span>

            <h2>{kit.name}</h2>

            <div className="orange-line" />

            <h3>{kit.heading}</h3>

            <p>{kit.description}</p>

            <div className="kit-specs">
              {kit.specs.map(([label, value]) => (
                <div className="kit-spec" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

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

        {/* =====================================================
            DEVELOPMENT COORDINATE PANEL
        ===================================================== */}

        {DEBUG_MODE && (
          <div className="hotspot-debug-panel">
            <div className="debug-heading">
              <span>HOTSPOT EDITOR</span>
              <small>DEV MODE</small>
            </div>

            <div className="debug-selected">
              SELECTED:
              <strong>{hotspots[selectedHotspot].label}</strong>
            </div>

            <div className="debug-values">
              <div>
                <span>X / LEFT</span>
                <strong>{hotspots[selectedHotspot].left.toFixed(2)}%</strong>
              </div>

              <div>
                <span>Y / TOP</span>
                <strong>{hotspots[selectedHotspot].top.toFixed(2)}%</strong>
              </div>

              <div>
                <span>WIDTH</span>
                <strong>{hotspots[selectedHotspot].width.toFixed(2)}%</strong>
              </div>

              <div>
                <span>HEIGHT</span>
                <strong>{hotspots[selectedHotspot].height.toFixed(2)}%</strong>
              </div>
            </div>

            <div className="debug-actions">
              <button onClick={copySelectedCoordinates}>
                {copied ? "COPIED" : "COPY SELECTED"}
              </button>

              <button onClick={copyAllCoordinates}>COPY ALL</button>
            </div>

            <p>
              DRAG A BOX TO MOVE IT.
              <br />
              DRAG THE SMALL CORNER TO RESIZE IT.
              <br />
              CLICK A BOX TO SWITCH THE PRODUCT PANEL.
            </p>
          </div>
        )}

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
