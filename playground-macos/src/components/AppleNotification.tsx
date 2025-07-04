import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AppleNotificationProps {
  show: boolean;
  onClick: () => void;
  onClose: () => void;
  title: string;
  message: string;
  icon?: string;
  className?: string;
}

const AppleNotification: React.FC<AppleNotificationProps> = ({
  show,
  onClick,
  onClose,
  title,
  message,
  icon,
  className
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -40, x: 300 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: -40, x: 300 }}
        transition={{ duration: 0.3 }}
        className={`right-6 z-50 cursor-pointer font-avenir ${className || ''}`}
        onClick={onClick}
      >
        <div
          className="relative flex items-center w-[400px] px-7 py-4 bg-white/10 backdrop-blur-lg border border-purple-400/20 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300 group"        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute -top-3 -left-3 bg-gray-700/80 border-none rounded-full w-6 h-6 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200"
            style={{ fontSize: 14 }}
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
            className="w-9 h-9 mr-4 rounded-lg shadow"
          />
          <div className="flex-1">
            <div
              className="font-semibold text-lg mb-1"
              style={{
                color: '#f4f0ff',
                textShadow: `0 0 6px rgba(180, 140, 255, 0.3), 0 0 12px rgba(180, 140, 255, 0.25), 0 0 24px rgba(180, 140, 255, 0.2)`
              }}
            >
              {title}
            </div>
            <div className="text-purple-100 text-base leading-snug font-normal">
              {message}
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AppleNotification;
