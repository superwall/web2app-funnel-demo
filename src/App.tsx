import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QuestionRenderer } from "./components/QuestionRenderer";
import questionnaireData from "./data/questionnaire.json";
import { QuestionnaireConfig } from "./types/onboarding";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <QuestionRenderer
                  questionnaire={{
                    questions: (questionnaireData as QuestionnaireConfig)
                      .questions,
                    theme: (questionnaireData as QuestionnaireConfig).theme,
                  }}
                />
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
