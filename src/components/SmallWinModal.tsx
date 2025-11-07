import { motion } from "motion/react";
import { Button } from "./ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface SmallWinModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onContinue: () => void;
  showConfetti?: boolean;
}

export function SmallWinModal({
  isOpen,
  title,
  message,
  onContinue,
  showConfetti = true,
}: SmallWinModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <ConfettiEffect trigger={isOpen} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={onContinue}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
          style={{ boxShadow: "var(--shadow-large)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full"
              style={{ backgroundColor: "var(--pastel-lavender)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-32 h-32 rounded-full"
              style={{ backgroundColor: "var(--pastel-mint)" }}
            />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--pastel-lavender)" }}
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              {title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              {message}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={onContinue}
                className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
