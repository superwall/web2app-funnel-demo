export enum QuestionType {
  FreeResponse = "free_response",
  MultipleChoice = "multiple_choice",
  SingleSelect = "single_select",
  Interstitial = "interstitial",
  Completion = "completion",
}

export interface Option {
  title: string;
  subtitle?: string;
  icon?: string;
}

export interface GoogleFont {
  family: string;
  weights?: number[];
  display?: "auto" | "block" | "swap" | "fallback" | "optional";
}

export interface ThemeConfig {
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    secondary?: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    background: {
      light: string;
      default: string;
      dark: string;
    };
  };
  fonts: {
    body: string[];
    heading: string[];
    google?: GoogleFont[];
  };
}

export interface QuestionnaireConfig {
  theme: ThemeConfig;
  questions: QuestionnaireQuestion[];
}

export interface QuestionnaireQuestion {
  id: string;
  hero?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  questionType: QuestionType;
  options?: Option[];
  nextButtonText?: string;
  required?: boolean;
  showSkipButton?: boolean;
  instructions?: string;
  placeholder?: string;
  validationRegex?: string;
  errorMessage?: string;
  columns?: 1 | 2;
  compact?: boolean;
  redirectUrl?: string;
  autoRedirect?: boolean;
  align?: "left" | "right" | "center";
  nextButtonAlign?: "left" | "right" | "center";
}
