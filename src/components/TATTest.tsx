import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { chatWithAI } from '../utils/chatWithAI';

// Dodaj ove tipove ako već nisu definisani
interface TATTestProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

const TATTest: React.FC<TATTestProps> = ({ onComplete, onBack }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [response, setResponse] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // Sample TAT images data
  const tatImages = [
    {
      image: "/images/tat-1.jpg",
      prompt: "What is happening in this picture? What led up to this situation?"
    },
    {
      image: "/images/tat-2.jpg",
      prompt: "What are the people thinking and feeling? What will happen next?"
    },
    {
      image: "/images/tat-3.jpg",
      prompt: "What is the relationship between these people? What are they discussing?"
    }
  ];

  const totalImages = tatImages.length;
  const currentImageData = tatImages[currentImage];

  const analyzeWithAI = async (word: string) => {
  setIsLoading(true);
  setAiResponse('');
  
  try {
    // Koristi univerzalnu funkciju
    const analysis = await chatWithAI(
     word
    );
    
    setAiResponse(analysis);
   
  } catch (error) {
    console.error('Analysis error:', error);
    setAiResponse("Unable to get analysis at the moment.");
  } finally {
    setIsLoading(false);
  }
};
  const handleNext = async () => {
    if (!response.trim()) return;

    // Analiziraj sa AI
    await analyzeWithAI(response.trim());

    if (currentImage < totalImages - 1) {
      // Pređi na sledeću sliku
      setTimeout(() => {
        setCurrentImage(prev => prev + 1);
        setResponse('');
        setAiResponse('');
      }, 2000);
    } else {
      // Završi test
      setShowWinModal(true);
    }
  };

  const handleComplete = () => {
    setShowWinModal(false);
    onComplete({
      completed: true,
      totalImages: totalImages,
      timestamp: new Date().toISOString()
    });
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
          <h3 className="text-lg font-semibold">TAT Test</h3>
          <p className="text-xs text-muted-foreground">
            Image {currentImage + 1} of {totalImages}
          </p>
        </div>

        <div className="w-24" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-3xl p-6 flex flex-col"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
              >
                <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden min-h-[400px]">
                  <div className="text-center p-8">
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-semibold text-gray-600">
                        TAT Image {currentImage + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {currentImageData.image}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Response Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 flex flex-col justify-between"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
            >
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      {currentImageData.prompt}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Answer with <span className="font-semibold text-primary">one word</span>
                    </p>
                  </motion.div>
                </AnimatePresence>

                <input
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter one word..."
                  className="w-full h-14 rounded-2xl border-2 border-primary/20 focus:border-primary/40 mb-4 text-lg text-center px-4"
                  onKeyDown={(e) => e.key === "Enter" && handleNext()}
                />

                {/* AI Analysis Section */}
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-4 p-4 bg-green-50 rounded-2xl border border-green-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">AI Insight</span>
                    </div>
                    <p className="text-sm text-green-900">{aiResponse}</p>
                  </motion.div>
                )}

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-800 text-center">
                    💡 What feeling stands out most to you?
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: totalImages }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentImage
                        ? "bg-blue-500 scale-110"
                        : i < currentImage
                          ? "bg-green-500"
                          : "bg-gray-300"
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!response.trim() || isLoading}
                  className="w-full h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg font-semibold text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      AI is analyzing...
                    </>
                  ) : currentImage < totalImages - 1 ? (
                    "Next Image"
                  ) : (
                    "Complete Test"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-2">Test Complete! 🎉</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've successfully completed the TAT test.
            </p>
            <button
              onClick={handleComplete}
              className="w-full h-12 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TATTest;