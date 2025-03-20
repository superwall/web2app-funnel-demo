import React, { useState, useEffect } from "react";
import { QuestionRenderer } from "./QuestionRenderer";
import { QuestionnaireConfig } from "../types/onboarding";
import questionnaireData from "../data/questionnaire.json";

/**
 * A special renderer component that listens for postMessage events to update the questionnaire preview.
 * This allows the admin panel to send updated questionnaire data for real-time preview.
 */
export function QuestionnairePreview() {
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireConfig>(
    questionnaireData as QuestionnaireConfig
  );

  useEffect(() => {
    // Listen for messages from the parent window (admin panel)
    const handleMessage = (event: MessageEvent) => {
      try {
        // Validate the message is from a trusted source
        if (event.origin !== window.location.origin) {
          console.log("Ignoring message from untrusted origin:", event.origin);
          return;
        }

        // Check if the data is a valid questionnaire configuration
        if (
          event.data &&
          typeof event.data === "object" &&
          "questions" in event.data &&
          "theme" in event.data
        ) {
          console.log("Received questionnaire update:", event.data);
          setQuestionnaire(event.data as QuestionnaireConfig);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Send ready message to parent
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: "PREVIEW_READY" },
        window.location.origin
      );
    }

    // Clean up event listener
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="questionnaire-preview">
      <QuestionRenderer
        questionnaire={{
          questions: questionnaire.questions,
          theme: questionnaire.theme,
        }}
      />
    </div>
  );
}
