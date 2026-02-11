import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router";
import LandingTrustExercise from "./components/LandingTrustExercise";
import { MainOffice } from "./components/MainOffice";
import { ProblemSelection } from "./components/ProblemSelection";
import { QuestionFlow } from "./components/QuestionFlow";
import { SelfEsteemTest } from "./components/SelfEsteemTest";
import { WellBeingTest } from "./components/WellBeingTest";
import { AnalysisReport } from "./components/AnalysisReport";
import { BookingFlow } from "./components/BookingFlow";
import { Dashboard } from "./components/Dashboard";
import ReactPlayer from 'react-player';

type ActivityType = "problem-cards" | "self-esteem" | "well-being";

interface BookingDetails {
  sessionType: "in-person" | "online";
  date: Date;
  time: string;
}

interface AppContextType {
  currentActivity: ActivityType | null;
  setCurrentActivity: (activity: ActivityType | null) => void;
  selectedProblem: string;
  setSelectedProblem: (problem: string) => void;
  activityAnswers: string[];
  setActivityAnswers: (answers: string[]) => void;
  bookingDetails: BookingDetails | null;
  setBookingDetails: (details: BookingDetails | null) => void;
  resetState: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// Landing page wrapper component
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <LandingTrustExercise onStart={() => navigate("/office")} />
    </div>
  );
}

// Main Office wrapper component
function MainOfficePage() {
  const navigate = useNavigate();
  const { setCurrentActivity } = useAppContext();

  const handleActivitySelect = (activityId: string) => {
    if (activityId === "problem-cards") {
      setCurrentActivity("problem-cards");
      navigate("/problem-selection");
    } else if (activityId === "self-esteem") {
      setCurrentActivity("self-esteem");
      navigate("/self-esteem");
    } else if (activityId === "well-being") {
      setCurrentActivity("well-being");
      navigate("/well-being");
    }
  };

  return <MainOffice onActivitySelect={handleActivitySelect} />;
}

// Problem Selection wrapper component
function ProblemSelectionPage() {
  const navigate = useNavigate();
  const { setSelectedProblem } = useAppContext();

  const handleProblemSelect = (problem: string) => {
    setSelectedProblem(problem);
    navigate("/question-flow");
  };

  return (
    <ProblemSelection
      isOpen={true}
      onClose={() => navigate("/office")}
      onSelect={handleProblemSelect}
    />
  );
}

// Question Flow wrapper component
function QuestionFlowPage() {
  const navigate = useNavigate();
  const { selectedProblem, setActivityAnswers } = useAppContext();

  const handleComplete = (answers: string[]) => {
    setActivityAnswers(answers);
    navigate("/analysis");
  };

  return (
    <QuestionFlow
      problem={selectedProblem}
      onComplete={handleComplete}
      onBack={() => navigate("/problem-selection")}
    />
  );
}

// Self Esteem Test wrapper component
function SelfEsteemPage() {
  const navigate = useNavigate();
  const { setActivityAnswers } = useAppContext();

  const handleComplete = (responses: number[]) => {
    setActivityAnswers(responses.map(String));
    navigate("/analysis");
  };

  return (
    <SelfEsteemTest
      onComplete={handleComplete}
      onBack={() => navigate("/office")}
    />
  );
}

// Well Being Test wrapper component
function WellBeingPage() {
  const navigate = useNavigate();
  const { setActivityAnswers } = useAppContext();

  const handleComplete = (responses: number[]) => {
    setActivityAnswers(responses.map(String));
    navigate("/analysis");
  };

  return (
    <WellBeingTest
      onComplete={handleComplete}
      onBack={() => navigate("/office")}
    />
  );
}

// Analysis Report wrapper component
function AnalysisPage() {
  const navigate = useNavigate();
  const { currentActivity, selectedProblem, activityAnswers, resetState } = useAppContext();

  if (!currentActivity) {
    return <Navigate to="/office" replace />;
  }

  const handleTryAnother = () => {
    resetState();
    navigate("/office");
  };

  return (
    <AnalysisReport
      problem={selectedProblem}
      answers={activityAnswers}
      testType={currentActivity}
      onBookSession={() => navigate("/booking")}
      onTryAnother={handleTryAnother}
    />
  );
}

// Booking Flow wrapper component
function BookingPage() {
  const navigate = useNavigate();
  const { setBookingDetails } = useAppContext();

  const handleComplete = (details: BookingDetails) => {
    setBookingDetails(details);
    navigate("/dashboard");
  };

  return (
    <BookingFlow
      onComplete={handleComplete}
      onBack={() => navigate("/analysis")}
    />
  );
}

// Dashboard wrapper component
function DashboardPage() {
  const navigate = useNavigate();
  const { bookingDetails, resetState } = useAppContext();

  const handleBackToOffice = () => {
    resetState();
    navigate("/office");
  };

  return (
    <Dashboard
      onBackToHome={handleBackToOffice}
      bookingDetails={bookingDetails}
    />
  );
}

// App Layout with ReactPlayer
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <ReactPlayer
        url="/RelaxingBackgroundMusic.mp3"
        playing={true}
        loop={true}
        volume={0.3}
        height="0"
        width="0"
      />
      {children}
    </div>
  );
}

export default function App() {
  const [currentActivity, setCurrentActivity] = useState<ActivityType | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [activityAnswers, setActivityAnswers] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const resetState = () => {
    setCurrentActivity(null);
    setSelectedProblem("");
    setActivityAnswers([]);
  };

  const contextValue: AppContextType = {
    currentActivity,
    setCurrentActivity,
    selectedProblem,
    setSelectedProblem,
    activityAnswers,
    setActivityAnswers,
    bookingDetails,
    setBookingDetails,
    resetState,
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/office" element={<MainOfficePage />} />
            <Route path="/problem-selection" element={<ProblemSelectionPage />} />
            <Route path="/question-flow" element={<QuestionFlowPage />} />
            <Route path="/self-esteem" element={<SelfEsteemPage />} />
            <Route path="/well-being" element={<WellBeingPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
