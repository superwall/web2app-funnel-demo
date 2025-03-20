import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  QuestionnaireQuestion,
  ThemeConfig,
  GoogleFont,
} from "../types/onboarding";
import { NavigationBar } from "./navigation/NavigationBar";
import { QuestionContent } from "./questions/QuestionContent";
import { NextButton } from "./navigation/NextButton";

// Create CSS variables from theme
const createCssVariables = (theme: ThemeConfig) => {
  const variables: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors.primary).forEach(([key, value]) => {
    variables[`--color-primary-${key}`] = value as string;
  });

  if (theme.colors.secondary) {
    Object.entries(theme.colors.secondary).forEach(([key, value]) => {
      variables[`--color-secondary-${key}`] = value as string;
    });
  }

  Object.entries(theme.colors.background).forEach(([key, value]) => {
    variables[`--color-bg-${key}`] = value as string;
  });

  // Fonts
  variables["--font-body"] = theme.fonts.body.join(", ");
  variables["--font-heading"] = theme.fonts.heading.join(", ");

  return variables;
};

// Load Google Fonts
const loadGoogleFonts = (fonts: GoogleFont[]) => {
  if (!fonts?.length) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";

  const familyQueries = fonts
    .map((font) => {
      const family = font.family.replace(/\s+/g, "+");
      if (!font.weights || font.weights.length === 0) {
        return family;
      }
      return `${family}:wght@${font.weights.join(";")}`;
    })
    .join("&family=");

  link.href = `https://fonts.googleapis.com/css2?family=${familyQueries}&display=swap`;
  document.head.appendChild(link);
};

interface QuestionRendererProps {
  questionnaire: {
    questions: QuestionnaireQuestion[];
    theme: ThemeConfig;
  };
}

export function QuestionRenderer({ questionnaire }: QuestionRendererProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );
  const [error, setError] = useState("");
  const [direction, setDirection] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const questions = questionnaire.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = responses[currentQuestion.id] || "";
  const isSecondToLast = currentQuestionIndex === questions.length - 2;
  const lastQuestion = questions[questions.length - 1];
  const shouldRedirectOnNext =
    isSecondToLast && lastQuestion.autoRedirect && lastQuestion.redirectUrl;

  // Apply theme CSS variables
  const cssVariables = createCssVariables(questionnaire.theme);

  // Load Google Fonts
  useEffect(() => {
    if (questionnaire.theme.fonts.google) {
      loadGoogleFonts(questionnaire.theme.fonts.google);
    }
  }, [questionnaire.theme.fonts.google]);

  useEffect(() => {
    setShowNav(currentQuestionIndex > 0);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (
      currentQuestion.questionType === "completion" &&
      currentQuestion.redirectUrl &&
      currentQuestion.autoRedirect
    ) {
      window.location.replace(currentQuestion.redirectUrl);
    }
  }, [currentQuestion]);

  const handleNext = () => {
    if (currentQuestion.required && !currentResponse) {
      setError("This question requires an answer");
      return;
    }

    if (
      currentQuestion.validationRegex &&
      typeof currentResponse === "string"
    ) {
      const regex = new RegExp(currentQuestion.validationRegex);
      if (!regex.test(currentResponse)) {
        setError(currentQuestion.errorMessage || "Invalid response");
        return;
      }
    }

    setError("");
    setDirection(1);

    if (shouldRedirectOnNext && lastQuestion.redirectUrl) {
      window.location.replace(lastQuestion.redirectUrl);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const handleResponse = (response: string | string[]) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }));
  };

  return (
    <div className="min-h-screen bg-brand-bg" style={cssVariables}>
      <div className="h-[64px] relative">
        <AnimatePresence>
          {showNav && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NavigationBar
                onBack={handleBack}
                onSkip={handleSkip}
                showSkipButton={currentQuestion.showSkipButton}
                currentProgress={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 md:px-6">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <QuestionContent
            question={currentQuestion}
            response={currentResponse}
            setResponse={handleResponse}
            error={error}
            direction={direction}
            handleKeyPress={handleKeyPress}
          />
        </AnimatePresence>
      </div>

      <NextButton
        onClick={handleNext}
        disabled={currentQuestion.required && !currentResponse}
        text={currentQuestion.nextButtonText}
        align={currentQuestion.nextButtonAlign}
      />
    </div>
  );
}
