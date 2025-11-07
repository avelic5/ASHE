import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface QuestionCardProps {
  question: string;
  currentCard: number;
  totalCards: number;
  onNext: (answer: string) => void;
  encouragementText?: string;
}

export function QuestionCard({
  question,
  currentCard,
  totalCards,
  onNext,
  encouragementText,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState("");
  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleNext = () => {
    if (answer.trim()) {
      setShowEncouragement(true);
      setTimeout(() => {
        onNext(answer);
        setAnswer("");
        setShowEncouragement(false);
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: -20, rotateY: 15 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full max-w-lg"
    >
      <div
        className="bg-white rounded-3xl p-8 relative overflow-hidden"
        style={{ boxShadow: "var(--shadow-large)" }}
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            Card {currentCard} of {totalCards}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    i < currentCard ? "var(--pastel-lavender)" : "var(--muted)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <h3 className="mb-8 text-center text-foreground">{question}</h3>

        {/* Answer input */}
        <div className="space-y-4">
          <div>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your one-word answer..."
              className="text-center h-14 rounded-2xl border-2 border-primary/20 focus:border-primary/40 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
            />
            <p className="text-xs text-muted-foreground text-center mt-2">
              Answer with one word
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={!answer.trim()}
            className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all"
          >
            Next Card
          </Button>
        </div>

        {/* Encouragement text with animation */}
        {showEncouragement && encouragementText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-3xl"
          >
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-primary text-center px-8"
            >
              {encouragementText}
            </motion.p>
          </motion.div>
        )}

        {/* Decorative gradient */}
        <div
          className="absolute top-0 left-0 w-full h-1 rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, var(--pastel-lavender), var(--pastel-sky), var(--pastel-mint))`,
          }}
        />
      </div>
    </motion.div>
  );
}
