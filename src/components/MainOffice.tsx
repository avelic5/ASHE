import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ActivityCard } from "./ActivityCard";
import { FaTrash } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import {
  Sun,
  Heart,
  Brain,
  Image,
  MessageSquare,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { chatWithAI } from "../utils/chatWithAI";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface MainOfficeProps {
  onActivitySelect: (activity: string) => void;
}

export function MainOffice({ onActivitySelect }: MainOfficeProps) {
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userMessages, setUserMessages] = useState<Message[]>([]); // Korisničke poruke
  const [aiMessages, setAIMessages] = useState<Message[]>([]); // AI poruke

  // Funkcija za slanje poruke AI-u
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    // Dodaj korisničku poruku u userMessages
    setUserMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Pozovi AI funkciju
      const aiResponse = await chatWithAI(inputMessage.trim());

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      // Dodaj AI odgovor u aiMessages
      setAIMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error communicating with AI:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setAIMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  //////////////////////////////////////

  useEffect(() => {
    console.log("AI: ", aiMessages);

    console.log("USER: ", userMessages);
  }, [aiMessages, userMessages]);

  const getAllMessages = (): Message[] => {
    const combined: Message[] = [];
    const maxLength = Math.max(userMessages.length, aiMessages.length);

    for (let i = 0; i < maxLength; i++) {
      // Prvo dodaj korisničku poruku (ako postoji)
      if (userMessages[i]) {
        combined.push(userMessages[i]);
      }
      // Zatim dodaj AI odgovor (ako postoji)
      if (aiMessages[i]) {
        combined.push(aiMessages[i]);
      }
    }

    return combined;
  };
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  let allMessages = getAllMessages();

  const clearAllMessages = () => {
    setUserMessages([]);
    setAIMessages([]);
    allMessages = [];
  };

  const activities = [
    {
      title: "Problem Cards",
      icon: MessageSquare,
      color: "var(--pastel-lavender)",
      id: "problem-cards",
    },
    {
      title: "Do you believe in yourself?",
      icon: Heart,
      color: "var(--pastel-sky)",
      id: "self-esteem",
    },
    {
      title: "How are you feeling",
      icon: Sun,
      color: "var(--pastel-mint)",
      id: "well-being",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
      {/* Background */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1920&q=80"
          alt="Cozy psychotherapy office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f6]/85 via-[#f5f0eb]/80 to-[#f0ebe6]/85" />
      </div>

      {/* Decorative blobs (iza sadržaja) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 z-0"
        style={{ backgroundColor: "var(--pastel-mint)" }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20 z-0"
        style={{ backgroundColor: "var(--pastel-peach)" }}
      />

      {/* Top Navigation */}
      <nav className="absolute top-1 left-1 z-10 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--pastel-lavender)" }}
          >
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-foreground">First Session</h1>
            <p className="text-xs text-muted-foreground">Your safe space</p>
          </div>
        </motion.div>
      </nav>

      {/* Chat panel – force bottom-left positioning */}
      <motion.aside
        role="dialog"
        aria-label="Notes"
        aria-modal="false"
        className="fixed z-50 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: notesOpen ? 1 : 0,
          scale: notesOpen ? 1 : 0.98,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{
          pointerEvents: notesOpen ? "auto" : "none",
          left: 16,
          bottom: 16,
          top: "auto",
          right: "auto",
        }}
      >
        <div className="overflow-y-auto rounded-2xl bg-white/80 backdrop-blur-sm ro space-y-3">
          {allMessages.length === 0
            ? null
            : allMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-purple-100 to-purple-50 text-gray-800 shadow-sm"
                        : "bg-gradient-to-br from-gray-50 to-white text-gray-800 shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="font-semibold text-xs mb-1.5 opacity-70">
                      {message.role === "user" ? "You" : "AI Agent"}
                    </p>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-br from-gray-50 to-white text-gray-800 rounded-2xl p-3 text-sm max-w-[80%] shadow-sm border border-gray-100">
                <p className="font-semibold text-xs mb-1.5 opacity-70">
                  AI Agent
                </p>
                <p className="animate-pulse">Thinking...</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full rounded-2xl p-4 bg-white/90 backdrop-blur-md border-t border-gray-200/50 flex flex-col gap-3 will-change-transform">
          {/* Header */}

          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Chat with AI
            </h3>
            <button
              onClick={() => setNotesOpen(false)}
              className="mr-2 h-8 px-4 rounded-lg text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages Container - SCROLLABLE */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {/* Input Area */}
            <div className="flex items-center gap-2 bg-white/60 rounded-xl p-2 border border-gray-200/50">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                placeholder="Share your thoughts..."
                className="flex-1 min-h-[60px] max-h-24 bg-transparent placeholder:text-gray-400 text-gray-800 text-sm outline-none resize-none"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  disabled={!inputMessage.trim() || isLoading}
                  className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
                >
                  <IoSend className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    clearAllMessages();
                  }}
                  className="h-9 w-9 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content: kolona + raste preko min visine; centrira se kad je chat otvoren */}
      <motion.main
        layout
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className={`relative z-10 mx-auto w-full max-w-5xl px-4
                    min-h-[calc(100vh-120px)]
                    flex flex-col items-center
                    ${notesOpen ? "justify-center" : "justify-start"}`}
      >
        {/* Avatar floats to top-left when panel opens */}
        {notesOpen && (
          <motion.div
            layoutId="session-avatar"
            className="absolute top-20 left-[-100px] z-30 w-30 h-30 rounded-full overflow-hidden  border-white "
          >
            <img
              src="/src/public/Male1.png"
              alt="AI Agent"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        {/* Center avatar (moves into panel on click) */}
        {!notesOpen && (
          <motion.button
            type="button"
            layoutId="session-avatar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.15 }}
            onClick={() => setNotesOpen(true)}
            className="relative mt-20 mb-6 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-outline)] cursor-pointer"
            aria-label="Open notes panel"
          >
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 rounded-full "
              animate={{
                boxShadow: [
                  "0 0 20px 10px rgba(139, 127, 184, 0.4)",
                  "0 0 40px 20px rgba(139, 127, 184, 0.6)",
                  "0 0 20px 10px rgba(139, 127, 184, 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "radial-gradient(circle, rgba(139, 127, 184, 0.3) 0%, transparent 70%)",
              }}
            />
            <div className="relative w-35 h-35 sm:w-35 sm:h-35 rounded-full overflow-hidden shadow-2xl  ring-white/20 transition-transform">
              <img
                src="/src/public/Male1.png"
                alt="AI Agent"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        )}

        {/* Tekst — dodatno spušten; još niže kad je chat otvoren */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-center max-w-2xl w-full ${
            notesOpen ? "mt-0" : "mt-0"
          }`}
        >
          <h2 className="mb-4 text-foreground">
            Welcome to Your First Session
          </h2>
          <p className="text-muted-foreground">
            Choose an activity below to begin your journey of self-discovery.
            Take your time, and remember: this is a safe space.
          </p>
        </motion.div>

        {/* Kartice — kolona ispod desktopa; wrap od sm naviše; spuštene još malo */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`w-full ${notesOpen ? "mt-0" : "mt-0"} mb-3`}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 sm:-inset-8 rounded-[2rem] sm:rounded-[3rem]"
              
            />
            <div
              className="relative flex flex-col /* mobile-first: kolona */
                                sm:flex-row sm:flex-wrap /* od sm: wrap */
                                gap-3 sm:gap-8 justify-center p-6 sm:p-10"
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08 }}
                  
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

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-s text-muted-foreground text-center mb-8"
        >
          Click any card to begin your personalized session
        </motion.p>
      </motion.main>
    </div>
  );
}
