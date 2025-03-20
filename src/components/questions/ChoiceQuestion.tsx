import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Option } from "../../types/onboarding";

interface ChoiceQuestionProps {
  options: Option[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  isMultiple: boolean;
  onOptionSelect?: () => void;
  columns?: 1 | 2;
  compact?: boolean;
}

export function ChoiceQuestion({
  options,
  selected,
  onChange,
  isMultiple,
  onOptionSelect,
  columns = 1,
  compact = false,
}: ChoiceQuestionProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {options.map((option: Option) => {
          const isSelected = Array.isArray(selected)
            ? selected.includes(option.title)
            : selected === option.title;

          const handleClick = () => {
            if (isMultiple) {
              const currentResponse = Array.isArray(selected) ? selected : [];
              if (currentResponse.includes(option.title)) {
                onChange(currentResponse.filter((r) => r !== option.title));
              } else {
                onChange([...currentResponse, option.title]);
              }
            } else {
              onChange(option.title);
              if (onOptionSelect) {
                setTimeout(onOptionSelect, 300);
              }
            }
          };

          return (
            <motion.button
              key={option.title}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all hover:scale-[1.02] duration-200 active:scale-[0.98] ${
                isSelected
                  ? "border-brand-primary-500 bg-brand-primary-50"
                  : "border-brand-bg-dark bg-white/80 hover:border-brand-bg-dark"
              }`}
              onClick={handleClick}
            >
              {isMultiple ? (
                <div
                  className={`rounded flex items-center justify-center ${
                    isSelected ? "" : "border-gray-300 w-4 h-4 border-2 "
                  }`}
                >
                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-brand-primary-500"
                      strokeWidth={3}
                    />
                  )}
                </div>
              ) : (
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-brand-primary-500 bg-brand-primary-50"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-brand-primary-500" />
                  )}
                </div>
              )}
              <span className="font-medium">{option.title}</span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`grid ${
        columns === 2 ? "md:grid-cols-2 gap-3" : "grid-cols-1 space-y-3"
      }`}
    >
      {options.map((option: Option) => {
        const isSelected = Array.isArray(selected)
          ? selected.includes(option.title)
          : selected === option.title;

        const handleClick = () => {
          if (isMultiple) {
            const currentResponse = Array.isArray(selected) ? selected : [];
            if (currentResponse.includes(option.title)) {
              onChange(currentResponse.filter((r) => r !== option.title));
            } else {
              onChange([...currentResponse, option.title]);
            }
          } else {
            onChange(option.title);
            if (onOptionSelect) {
              setTimeout(onOptionSelect, 300);
            }
          }
        };

        return (
          <motion.button
            key={option.title}
            className={`w-full p-4 rounded-lg border transition-all hover:scale-[1.01] duration-200 active:scale-[0.99] ${
              isSelected
                ? "border-brand-primary-500 border-2 bg-brand-primary-50"
                : "border-brand-bg-dark border-2 bg-white/80 hover:border-brand-bg-dark"
            }`}
            onClick={handleClick}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {option.icon && (
                  <span className="mr-3 text-xl">{option.icon}</span>
                )}
                <div className="text-left">
                  <div className="font-medium">{option.title}</div>
                  {option.subtitle && (
                    <div className="text-sm text-gray-500">
                      {option.subtitle}
                    </div>
                  )}
                </div>
              </div>
              {isMultiple ? (
                <div
                  className={`rounded ml-2 flex items-center justify-center ${
                    isSelected ? "" : "border-gray-300 w-5 h-5 border-2 "
                  }`}
                >
                  {isSelected && (
                    <Check
                      className="w-5 h-5 text-brand-primary-500"
                      strokeWidth={3}
                    />
                  )}
                </div>
              ) : (
                <div
                  className={`w-5 h-5 rounded-full border-2 ml-2 flex items-center justify-center ${
                    isSelected
                      ? "border-brand-primary-500 bg-brand-primary-50"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-primary-500" />
                  )}
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
