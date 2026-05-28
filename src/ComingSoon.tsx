import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import HeroMask from "./HeroMask";

const LAUNCH_DATE = new Date("2026-06-01T00:00:00");

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <motion.span
        key={value}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          fontFamily: "Moche, sans-serif",
          fontWeight: 200,
          fontSize: "clamp(32px, 4.5vw, 64px)",
          lineHeight: 1,
          color: "#D6B283",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span
        style={{
          fontFamily: "Moche, sans-serif",
          fontWeight: 300,
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "#D6B283",
          opacity: 0.45,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "clamp(10px, 2.5vw, 32px)",
      }}
    >
      {units.map(({ label, value }, i) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(10px, 2.5vw, 32px)",
          }}
        >
          <CountdownBlock value={value} label={label} />
          {i < units.length - 1 && (
            <span
              style={{
                fontFamily: "Moche, sans-serif",
                fontWeight: 200,
                fontSize: "clamp(24px, 3.5vw, 52px)",
                color: "#D6B283",
                opacity: 0.2,
                marginTop: "clamp(6px, 1vw, 12px)",
                lineHeight: 1,
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}

const kajaLetters = [
  { dark: "/svg/K-dark.svg", label: "K" },
  { dark: "/svg/A-dark.svg", label: "A" },
  { dark: "/svg/J-dark.svg", label: "J" },
  { dark: "/svg/A-dark.svg", label: "A" },
];

const socialLinks = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/kajabynuma?igsh=MTh1eHJycTdhaW1jeA==",
    target: "_blank",
  },
];

export default function ComingSoon() {
  return (
    <div
      className="kaja-page-root"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#32341D",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#D6B283",
          opacity: 0.3,
          transformOrigin: "left",
        }}
      />

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#D6B283",
          opacity: 0.3,
          transformOrigin: "right",
        }}
      />

      {/* Decorative mask — bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 2.5, delay: 0.8 }}
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "clamp(120px, 16vw, 260px)",
          pointerEvents: "none",
          userSelect: "none",
          transform: "scale(-1)",
        }}
      >
        <div
          style={{ position: "relative", width: "100%", paddingBottom: "116%" }}
        >
          <HeroMask />
        </div>
      </motion.div>

      {/* KAJA letters — full-page background */}
      <div
        aria-hidden
        className="kaja-bg-letter-grid"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {kajaLetters.map((letter, index) => (
          <motion.img
            key={index}
            src={letter.dark}
            alt=""
            className={`kaja-bg-letter${letter.label === "J" ? " kaja-bg-letter-j" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.07 }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5 + index * 0.18,
            }}
          />
        ))}
      </div>

      {/* Radial vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(50,52,29,0.5) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ─── Content ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "clamp(16px, 3vw, 40px) clamp(20px, 6vw, 80px)", // overridden by .kaja-content-wrap on mobile
        }}
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div />
          <img
            src="/svg/KAJA LOGO WHITE.svg"
            alt="KAJA"
            style={{ width: "clamp(40px, 6.5vw, 80px)" }}
          />
          <p
            style={{
              fontFamily: "Moche, sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "#D6B283",
              opacity: 0.45,
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            Ubud · Bali
          </p>
        </motion.header>

        {/* Main */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 80px)",
            overflow: "hidden",
            paddingTop: "clamp(8px, 2vh, 20px)",
            paddingBottom: "clamp(8px, 2vh, 20px)",
          }}
        >
          {/* Text + countdown */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "clamp(10px, 1.8vh, 20px)",
              flexShrink: 0,
            }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              style={{
                fontFamily: "Moche, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(9px, 1vw, 12px)",
                letterSpacing: "0.38em",
                color: "#D6B283",
                textTransform: "uppercase",
              }}
            >
              An extraordinary experience is arriving
            </motion.p>

            {/* Heading */}
            <div style={{ overflow: "hidden", padding: "0.1em 0 0.15em" }}>
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="heading-responsive"
                style={{}}
              >
                Cooking Something Exciting
              </motion.h1>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 1.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                height: "1px",
                width: "clamp(60px, 10vw, 140px)",
                backgroundColor: "#D6B283",
                opacity: 0.45,
                transformOrigin: "center",
              }}
            />

            {/* Date */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              style={{
                fontFamily: "Moche, sans-serif",
                fontWeight: 200,
                fontSize: "clamp(18px, 2.8vw, 40px)",
                color: "#D6B283",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              1st June 2026
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{
                fontFamily: "Moche, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(12px, 1.3vw, 16px)",
                lineHeight: "155%",
                color: "#FCF7F5",
                maxWidth: "380px",
              }}
            >
              A complete evening experience — iconic architecture, contemporary
              cuisine, and entertainment, woven into one.
            </motion.p>

            {/* Countdown */}
            <Countdown />
          </div>
        </main>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          style={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(214,178,131,0.12)",
          }}
        >
          {socialLinks.map(({ icon: SocialIcon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              style={{
                color: "#D6B283",
                opacity: 0.4,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.4";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(0)";
              }}
            >
              <SocialIcon size={20} />
              <span
                style={{
                  fontFamily: "Moche, sans-serif",
                  fontWeight: 300,
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Follow us
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
