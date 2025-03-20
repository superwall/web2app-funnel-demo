import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface NavigationBarProps {
  onBack?: () => void;
  onSkip?: () => void;
  showSkipButton?: boolean;
  currentProgress: number;
  totalQuestions: number;
}

export function NavigationBar({
  onBack,
  onSkip,
  showSkipButton,
  currentProgress,
  totalQuestions,
}: NavigationBarProps) {
  const progressPercentage = (currentProgress / totalQuestions) * 100;

  return (
    <div className="h-[64px] flex items-center justify-between  bg-white border-b border-brand-bg-dark">
      <button
        onClick={onBack}
        className="w-[70px] text-gray-600 hover:text-gray-900 transition-colors flex items-center pl-4 md:pl-6"
      >
        {/* <ChevronLeft className="w-5 h-5" /> */}
        <ArrowLeft className="w-5 h-5" strokeWidth={3} />
        {/* Back */}
      </button>

      <div className="w-[50vw] max-w-[200px] absolute top-[32px] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-primary-600 rounded-full"
            initial={{
              width: `${((currentProgress - 1) / totalQuestions) * 100}%`,
            }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="w-[70px] flex flex-row text-sm md:text-md items-end justify-end pr-4 md:pr-6">
        {showSkipButton && onSkip && (
          <button
            onClick={onSkip}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
