import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import {
  Calendar,
  Video,
  Building2,
  CheckCircle2,
  Sparkles,
  Heart,
  Brain,
  Smile,
  TrendingUp,
  ArrowRight,
  Home,
} from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface DashboardProps {
  onBackToHome: () => void;
}

export function Dashboard({ onBackToHome }: DashboardProps) {
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const upcomingSession = {
    date: "November 14, 2025",
    time: "2:00 PM",
    type: "online",
    psychologist: "Dr. Sarah Chen",
  };

  const talkingPoints = [
    "Explored feelings about anxiety and stress management",
    "Discussed morning routines and their impact on mood",
    "Identified energy drains in daily life",
    "Set intention to work on sleep quality",
  ];

  const quickSolutions = [
    {
      title: "5-Minute Breathing",
      description: "Calm your nervous system",
      icon: Heart,
      color: "var(--pastel-lavender)",
    },
    {
      title: "Gratitude Journal",
      description: "Write 3 things daily",
      icon: Smile,
      color: "var(--pastel-mint)",
    },
    {
      title: "Mindful Walking",
      description: "10 minutes outside",
      icon: Brain,
      color: "var(--pastel-sky)",
    },
  ];

  const handleToggleItem = (index: number) => {
    if (completedItems.includes(index)) {
      setCompletedItems(completedItems.filter((i) => i !== index));
    } else {
      setCompletedItems([...completedItems, index]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };

  const progressValue = 33; // First session simulation done

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6] p-6">
      <ConfettiEffect trigger={showConfetti} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 mt-8"
        >
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors mb-6"
          >
            <Home className="w-4 h-4" />
            <span>Back to Office</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="mb-2">Your Therapy Journey</h1>
              <p className="text-muted-foreground">
                Track your progress and access helpful resources
              </p>
            </div>

            <div
              className="px-6 py-3 rounded-2xl flex items-center gap-3"
              style={{ backgroundColor: "var(--pastel-lavender)" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
              <div>
                <p className="text-sm text-white">Session 1 Complete!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="p-8 rounded-3xl border-0 mb-8"
            style={{ boxShadow: "var(--shadow-medium)" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--pastel-lavender)" }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3>Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  You're on the right path to better mental health
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Journey Progress</span>
                <span className="text-primary">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-3" />

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-2xl bg-background">
                  <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm">First Simulation</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-background opacity-50">
                  <Calendar className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">First Real Session</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-background opacity-50">
                  <ArrowRight className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Ongoing Sessions</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Session */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card
              className="p-8 rounded-3xl border-0 mb-6"
              style={{ boxShadow: "var(--shadow-medium)" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--pastel-sky)" }}
                >
                  {upcomingSession.type === "online" ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <Building2 className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3>Upcoming Session</h3>
                  <p className="text-sm text-muted-foreground">Your next appointment</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                      <p className="text-sm">
                        {upcomingSession.date} at {upcomingSession.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Psychologist</p>
                      <p className="text-sm">{upcomingSession.psychologist}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Session Type</p>
                      <div
                        className="inline-block px-3 py-1 rounded-xl text-sm capitalize"
                        style={{ backgroundColor: "var(--pastel-sky)", color: "white" }}
                      >
                        {upcomingSession.type}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90">
                    {upcomingSession.type === "online" ? "Join Video Call" : "Get Directions"}
                  </Button>
                </div>

                <div className="p-6 rounded-2xl bg-background">
                  <p className="text-sm mb-4">Preparation Tips</p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Review your talking points below</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Reflect on your week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Note any questions you have</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Talking Points */}
            <Card
              className="p-8 rounded-3xl border-0"
              style={{ boxShadow: "var(--shadow-medium)" }}
            >
              <h3 className="mb-4">Talking Points from Last Session</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Topics to continue exploring with your therapist
              </p>

              <div className="space-y-3">
                {talkingPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-background"
                  >
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm flex-1">{point}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Access Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-6"
          >
            <Card
              className="p-6 rounded-3xl border-0"
              style={{ boxShadow: "var(--shadow-medium)" }}
            >
              <h3 className="mb-4">Quick Access Solutions</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Daily practices recommended by your therapist
              </p>

              <div className="space-y-4">
                {quickSolutions.map((solution, index) => {
                  const Icon = solution.icon;
                  const isCompleted = completedItems.includes(index);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        isCompleted
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                      onClick={() => handleToggleItem(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: solution.color }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm">{solution.title}</p>
                            <Checkbox
                              checked={isCompleted}
                              onCheckedChange={() => handleToggleItem(index)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {solution.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-background text-center">
                <p className="text-xs text-muted-foreground">
                  ✨ Complete tasks to earn small wins
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
