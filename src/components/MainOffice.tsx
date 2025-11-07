import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { Brain, Image, MessageSquare, HelpCircle, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MainOfficeProps {
  onActivitySelect: (activity: string) => void;
}

export function MainOffice({ onActivitySelect }: MainOfficeProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const activities = [
    {
      title: "Problem Cards",
      icon: MessageSquare,
      color: "var(--pastel-lavender)",
      id: "problem-cards",
    },
    {
      title: "Rorschach Test",
      icon: Image,
      color: "var(--pastel-sky)",
      id: "rorschach",
    },
    {
      title: "TAT Test",
      icon: Brain,
      color: "var(--pastel-mint)",
      id: "tat",
    },
  ];

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
      {/* Background Image with Overlay (placeholder - feel free to replace with your own asset) */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1920&q=80"
          alt="Cozy psychotherapy office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f6]/85 via-[#f5f0eb]/80 to-[#f0ebe6]/85" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
        style={{ backgroundColor: "var(--pastel-mint)" }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20"
        style={{ backgroundColor: "var(--pastel-peach)" }}
      />

      {/* Top Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--pastel-lavender)" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-foreground">First Session</h1>
            <p className="text-xs text-muted-foreground">Your safe space</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:block text-right">
            <p className="text-sm text-muted-foreground">Session 1 of 1</p>
            <p className="text-xs text-muted-foreground">Intro simulation</p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors">
            <HelpCircle className="w-5 h-5 text-foreground" />
          </button>
        </motion.div>
      </nav>

      {/* Chat container with AI Agent Image above */}
      {notesOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: '1rem',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed left-4 bottom-4 z-40 w-[22rem] max-w-[calc(100vw-2rem)] flex flex-col gap-4"
        >
          {/* AI Agent Image above chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 mx-auto"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=512&q=80"
              alt="AI Agent"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Chat / notes panel */}
          <motion.aside
            role="dialog"
            aria-label="Notes"
            aria-modal="false"
            className="w-full rounded-2xl p-4 bg-white/70 backdrop-blur shadow-2xl border-2 border-border flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-sm font-medium text-foreground">Session notes</h3>
                <p className="text-xs text-muted-foreground">Jot ideas here. AI assist coming soon.</p>
              </div>
              <button
                onClick={() => {
                  setNotesOpen(false);
                }}
                className="h-8 px-3 rounded-xl text-xs bg-white/60 hover:bg-white/80 border border-border text-foreground"
              >
                Hide
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your message..."
              className="min-h-24 max-h-32 rounded-xl p-3 text-sm bg-white/50 placeholder:text-muted-foreground text-foreground border-2 border-border outline-none focus:ring-2 focus:ring-[var(--focus-outline)] resize-none"
            />
            <div className="flex items-center justify-end gap-2 flex-shrink-0">
              <button
                onClick={() => setNotes("")}
                className="h-8 px-3 rounded-xl text-xs bg-transparent hover:bg-white/60 border border-border text-muted-foreground"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  setNotesOpen(false);
                }}
                className="h-8 px-3 rounded-xl text-xs bg-primary text-white hover:bg-primary/90"
              >
                Done
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}

      {/* Main Content (centers when chat open) */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-[calc(100vh-120px)] px-4 transition-all duration-500 ease-[cubic-bezier(.4,.08,.2,1)] ${notesOpen ? 'lg:translate-y- md:left-[24rem] md:right-0 md:w-[calc(100vw-24rem)] md:translate-y-16' : '-translate-y-12'}`}
      >

        {/* AI Agent Image above Welcome Text (when chat is closed) - Clickable */}
        {!notesOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => {
              setNotesOpen(true);
            }}
            className="mb-8 flex justify-center cursor-pointer hover:scale-105 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-outline)]"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=512&q=80"
                alt="AI Agent"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        )}

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12 max-w-2xl"
        >
          <h2 className="mb-4 text-foreground">Welcome to Your First Session</h2>
          <p className="text-muted-foreground">
            Choose an activity below to begin your journey of self-discovery. Take your time,
            and remember: this is a safe space.
          </p>
        </motion.div>

        {/* Activity Cards on Desk Surface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Table surface */}
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-[3rem] transform perspective-1000 rotate-x-12"
              style={{
                background: "linear-gradient(145deg,var(--pastel-cream), var(--pastel-peach) 120%)",
                boxShadow: "0 24px 70px rgba(139, 127, 184, 0.25)",
                opacity: 0.85,
                filter: "blur(2px)",
              }}
            />
            <div className="relative flex flex-wrap gap-8 justify-center p-10">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <ActivityCard
                    title={activity.title}
                    icon={activity.icon}
                    color={activity.color}
                    onClick={() => onActivitySelect(activity.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Helpful hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground text-center mt-12"
        >
           Click any card to begin your personalized session
        </motion.p>
      </div>
    </div>
  );
}
