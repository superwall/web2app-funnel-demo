import React, { useRef, useEffect } from "react";

interface FreeResponseQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function FreeResponseQuestion({
  value,
  onChange,
  placeholder,
  onKeyPress,
}: FreeResponseQuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="w-full px-4 py-2 rounded-lg border border-brand-bg-dark focus:border-brand-primary-500 focus:ring-2 focus:ring-brand-primary-200"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
    />
  );
}
