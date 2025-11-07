import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Heart, Brain, Zap, Plus } from "lucide-react";

interface ProblemSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (problem: string) => void;
}

export function ProblemSelection({ isOpen, onClose, onSelect }: ProblemSelectionProps) {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [customIssue, setCustomIssue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  const problems = [
    { id: "anxiety", label: "Anxiety", icon: Heart, color: "var(--pastel-lavender)" },
    { id: "depression", label: "Depression", icon: Brain, color: "var(--pastel-sky)" },
    { id: "adhd", label: "ADHD", icon: Zap, color: "var(--pastel-mint)" },
  ];

  const handleContinue = () => {
    if (selectedProblem === "custom" && customIssue.trim()) {
      onSelect(customIssue);
    } else if (selectedProblem) {
      const problem = problems.find((p) => p.id === selectedProblem);
      if (problem) onSelect(problem.label);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full relative"
        style={{ boxShadow: "var(--shadow-large)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2">What do you want to work on today?</h2>
          <p className="text-muted-foreground">
            Select an area you'd like to explore. This helps personalize your session.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {problems.map((problem) => {
            const Icon = problem.icon;
            const isSelected = selectedProblem === problem.id;

            return (
              <motion.button
                key={problem.id}
                onClick={() => {
                  setSelectedProblem(problem.id);
                  setShowCustomInput(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/30"
                }`}
                style={{
                  backgroundColor: isSelected ? `${problem.color}20` : "white",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: problem.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-center">{problem.label}</p>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mx-auto mt-3"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Custom issue option */}
        <div className="mb-8">
          <motion.button
            onClick={() => {
              setShowCustomInput(!showCustomInput);
              setSelectedProblem(showCustomInput ? null : "custom");
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded-2xl border-2 transition-all ${
              selectedProblem === "custom"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "var(--pastel-peach)" }}
              >
                <Plus className="w-5 h-5 text-white" />
              </div>
              <p>Something else (custom)</p>
            </div>
          </motion.button>

          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Input
                value={customIssue}
                onChange={(e) => setCustomIssue(e.target.value)}
                placeholder="Describe what you'd like to work on..."
                className="h-12 rounded-2xl border-2 border-primary/20 focus:border-primary/40"
              />
            </motion.div>
          )}
        </div>

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          disabled={
            !selectedProblem || (selectedProblem === "custom" && !customIssue.trim())
          }
          className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
