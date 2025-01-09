"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function RoadBlocking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    localStorage.setItem("hasSeenEventsTour", "true");
  }, []);
  const features: Feature[] = [
    {
      title: "Welcome to EventSphere!",
      description:
        "Your all-in-one event management dashboard. Let's explore the key features available to you.",
      icon: <Plus className="w-8 h-8" />,
    },
    {
      title: "Create Events",
      description:
        "Easily create new events by clicking the 'Add Event' button. Add titles, descriptions, locations, and more.",
      icon: <Plus className="w-8 h-8" />,
    },
    {
      title: "Modify Events",
      description:
        "Need to make changes? Use the 'Modify' button to update event details anytime.",
      icon: <Edit className="w-8 h-8" />,
    },
    {
      title: "Delete Events",
      description:
        "Remove events that are no longer needed using the 'Delete' button.",
      icon: <Trash2 className="w-8 h-8" />,
    },
    {
      title: "Account Management",
      description:
        "Manage your account and securely log out using the options in the top right corner.",
      icon: <LogOut className="w-8 h-8" />,
    },
  ];

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                {features[currentStep].icon}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-4">
              {features[currentStep].title}
            </h2>

            <p className="text-gray-600 text-center mb-8">
              {features[currentStep].description}
            </p>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-blue-200"
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Skip tour
              </button>

              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  {currentStep === features.length - 1 ? (
                    <>
                      Get Started
                      <X className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
