import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
  align?: "left" | "right" | "center";
}

export function NextButton({
  onClick,
  disabled,
  text,
  align = "right",
}: NextButtonProps) {
  return (
    <div className="sticky bottom-0 w-full bg-brand-bg py-4">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <motion.div
          className="flex"
          initial={false}
          animate={{
            justifyContent:
              align === "left"
                ? "flex-start"
                : align === "center"
                ? "center"
                : "flex-end",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <motion.button
            onClick={onClick}
            className={`flex items-center md:text-lg px-6 pr-5 py-2 bg-brand-primary-600 text-white rounded-lg hover:bg-brand-primary-700 transition-colors ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={disabled}
          >
            {text || "Next"}
            <ChevronRight className="w-5 ml-1 mt-[2px]" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
