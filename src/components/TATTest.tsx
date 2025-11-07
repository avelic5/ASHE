import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft, Info } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TATTestProps {
  onComplete: (responses: string[]) => void;
  onBack: () => void;
}

export function TATTest({ onComplete, onBack }: TATTestProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [response, setResponse] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [showWinModal, setShowWinModal] = useState(false);

  const totalImages = 5;

  const prompts = [
    "What's happening in this picture?",
    "What emotion is present here?",
    "What might happen next?",
    "What is the main character feeling?",
    "What story does this tell you?",
  ];

  const handleNext = () => {
    if (response.trim()) {
      const newResponses = [...responses, response];
      setResponses(newResponses);
      setResponse("");

      if (currentImage < totalImages - 1) {
        setCurrentImage(currentImage + 1);
      } else {
        setShowWinModal(true);
      }
    }
  };

  const handleContinue = () => {
    setShowWinModal(false);
    onComplete(responses);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h3>TAT Test</h3>
          <p className="text-xs text-muted-foreground">
            Image {currentImage + 1} of {totalImages}
          </p>
        </div>

        <div className="w-24" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl flex items-start gap-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--pastel-mint)" }}
            >
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm">
                The Thematic Apperception Test (TAT) explores how you interpret stories. Answer
                the prompt with{" "}
                <span className="text-primary">one key word</span> that captures your
                interpretation.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-3xl p-8 flex items-center justify-center"
                style={{ boxShadow: "var(--shadow-large)" }}
              >
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1725711028475-99a333268847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGx1c3RyYXRpb24lMjBzdG9yeXxlbnwxfHx8fDE3NjI1NDIyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Story Illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Response Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 flex flex-col justify-between"
              style={{ boxShadow: "var(--shadow-large)" }}
            >
              <div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentImage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4"
                  >
                    {prompts[currentImage]}
                  </motion.h3>
                </AnimatePresence>

                <p className="text-sm text-muted-foreground mb-6">
                  Answer with one word that captures the essence.
                </p>

                <Input
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Your one-word interpretation..."
                  className="h-14 rounded-2xl border-2 border-primary/20 focus:border-primary/40 mb-4"
                  onKeyDown={(e) => e.key === "Enter" && handleNext()}
                />

                <p className="text-xs text-muted-foreground">
                  💡 Tip: What feeling or theme stands out most to you?
                </p>
              </div>

              <div className="space-y-4 mt-6">
                {/* Progress dots */}
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: totalImages }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor:
                          i <= currentImage ? "var(--pastel-mint)" : "var(--muted)",
                      }}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!response.trim()}
                  className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {currentImage < totalImages - 1 ? "Next Image" : "Complete Test"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Small Win Modal */}
      <SmallWinModal
        isOpen={showWinModal}
        title="TAT Test Complete! 🎉"
        message="You've explored different narratives and emotions. Your interpretations provide valuable insights into your perspective."
        onContinue={handleContinue}
      />
    </div>
  );
}
