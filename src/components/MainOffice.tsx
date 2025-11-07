import { motion } from "motion/react";
import { ActivityCard } from "./ActivityCard";
import { Brain, Image, MessageSquare, HelpCircle, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MainOfficeProps {
  onActivitySelect: (activity: string) => void;
}

export function MainOffice({ onActivitySelect }: MainOfficeProps) {
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1754037783933-c25ff9f68f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwb2ZmaWNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyNTQyMjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Therapy Office"
          className="w-full h-full object-cover"
        />
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        {/* Psychologist Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--pastel-lavender)",
                boxShadow: "var(--shadow-large)",
              }}
            >
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                <div className="text-5xl">🌸</div>
              </div>
            </motion.div>

            {/* Breathing indicator */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: "var(--pastel-lavender)",
                opacity: 0.3,
              }}
            />
          </div>
        </motion.div>

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

        {/* Activity Cards on Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Table surface */}
          <div className="relative">
            <div
              className="absolute -inset-8 rounded-[3rem] transform perspective-1000 rotate-x-12"
              style={{
                backgroundColor: "var(--pastel-cream)",
                boxShadow: "0 20px 60px rgba(139, 127, 184, 0.2)",
                opacity: 0.6,
              }}
            />

            <div className="relative flex flex-wrap gap-8 justify-center p-8">
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
          ✨ Click any card to begin your personalized session
        </motion.p>
      </div>
    </div>
  );
}
