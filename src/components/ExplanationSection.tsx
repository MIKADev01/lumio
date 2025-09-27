import React from "react";
import { motion } from "framer-motion";

interface ExplanationSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
}

const ExplanationSection = ({
  title = "AI-Powered Art Generation",
  description = "Our platform uses advanced AI algorithms to create stunning artwork based on your text prompts. Simply describe what you want to see, and our AI will bring your vision to life with remarkable detail and creativity.",
  imageUrl = "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&q=80",
  imagePosition = "left",
  backgroundColor = "bg-white",
}: ExplanationSectionProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className={`${backgroundColor} py-16 md:py-24 px-4 w-full`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
        >
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <img
              src={imageUrl}
              alt="AI Art Generation"
              className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
            <div className="pt-4">
              <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExplanationSection;
