import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AppleNotificationProps {
  show: boolean;
  onClick: () => void;
  onClose: () => void;
  title: string;
  message: string;
  icon?: string;
}

const AppleNotification: React.FC<AppleNotificationProps> = ({
  show,
  onClick,
  onClose,
  title,
  message,
  icon
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -40, x: 300 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: -40, x: 300 }}
        transition={{ duration: 0.3 }}
        className="fixed top-10 right-6 z-10 cursor-pointer"
        onClick={onClick}
        style={{
          minWidth: 340,
          maxWidth: 400,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
          padding: "10px 25px",
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.2)"
          // position: "relative"
        }}
        onMouseEnter={(e) => {
          const button = e.currentTarget.querySelector("button") as HTMLButtonElement;
          if (button) {
            button.style.opacity = "1";
            button.style.transform = "scale(1)";
          }
        }}
        onMouseLeave={(e) => {
          const button = e.currentTarget.querySelector("button") as HTMLButtonElement;
          if (button) {
            button.style.opacity = "0";
            button.style.transform = "scale(0.8)";
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            position: "absolute",
            top: -8,
            left: -8,
            background: "grey",
            border: "none",
            borderRadius: "50%",
            width: 24,
            height: 24,
            fontSize: 14,
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            opacity: 0,
            transform: "scale(0.8)",
            transition: "opacity 0.2s ease, transform 0.2s ease"
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img
          src={icon || "/img/ui/apple-health.png"}
          alt="icon"
          style={{ width: 36, height: 36, marginRight: 16, borderRadius: 8 }}
        />
        <div style={{ flex: 1 }}>
          {/* <div
            className="text-gray-500"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1 }}
          >
            TIME SENSITIVE
          </div> */}
          <div style={{ fontWeight: 700, fontSize: 16, color: "#222" }}>{title}</div>
          <div style={{ fontSize: 15, color: "#444" }}>{message}</div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AppleNotification;
