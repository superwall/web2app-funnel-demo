import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { QuestionnaireQuestion, QuestionType } from "../../types/onboarding";
import { FreeResponseQuestion } from "./FreeResponseQuestion";
import { ChoiceQuestion } from "./ChoiceQuestion";

interface QuestionContentProps {
  question: QuestionnaireQuestion;
  response: string | string[];
  setResponse: (value: string | string[]) => void;
  error: string;
  direction: number;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function QuestionContent({
  question,
  response,
  setResponse,
  error,
  direction,
  handleKeyPress,
}: QuestionContentProps) {
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(3px)",
      position: "absolute",
      width: "100%",
      top: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      position: "relative",
      width: "100%",
      top: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(3px)",
      position: "absolute",
      width: "100%",
      top: 0,
    }),
  };

  const renderQuestionInput = () => {
    switch (question.questionType) {
      case QuestionType.FreeResponse:
        return (
          <FreeResponseQuestion
            value={response as string}
            onChange={setResponse}
            placeholder={question.placeholder}
            onKeyPress={handleKeyPress}
          />
        );

      case QuestionType.MultipleChoice:
      case QuestionType.SingleSelect:
        return (
          <ChoiceQuestion
            options={question.options || []}
            selected={response}
            onChange={setResponse}
            isMultiple={question.questionType === QuestionType.MultipleChoice}
            onOptionSelect={undefined}
            columns={question.columns}
            compact={question.compact}
          />
        );

      case QuestionType.Completion:
      case QuestionType.Interstitial:
        return null;

      default:
        return <div>Unsupported question type</div>;
    }
  };

  const getAlignmentClass = () => {
    switch (question.align) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  const renderIcon = () => {
    if (question.icon === "check") {
      return (
        <div className="my-10 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <CheckCircle
              className="w-24 h-24 text-green-500"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      );
    }

    if (question.icon) {
      return (
        <div className="my-10 flex items-center justify-center">
          <img
            src={question.icon}
            alt=""
            className="w-[70px] h-[70px] object-cover smooth-corners-sm"
          />
        </div>
      );
    }

    return null;
  };

  const renderHero = () => {
    if (question.hero) {
      return (
        <img
          src={question.hero}
          alt=""
          className="w-full h-auto object-cover smooth-corners-md"
        />
      );
    }

    return null;
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <div
        className={`flex items-center text-red-600 my-5 text-sm ${
          getAlignmentClass() === "text-center" ? "justify-center" : ""
        }`}
      >
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </div>
    );
  };

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.35 },
        filter: { duration: 0.35 },
        position: { type: "just" },
      }}
    >
      {renderIcon()}
      {renderHero()}

      <div className={`${getAlignmentClass()}`}>
        <div className={`my-10 space-y-1 ${getAlignmentClass()}`}>
          {question.title && (
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {question.title}
            </h2>
          )}

          {question.subtitle && (
            <p className="md:text-lg text-gray-500">{question.subtitle}</p>
          )}

          {question.instructions && (
            <p className="text-gray-500">{question.instructions}</p>
          )}
        </div>

        {renderError()}

        <div className="">{renderQuestionInput()}</div>
      </div>
    </motion.div>
  );
}
