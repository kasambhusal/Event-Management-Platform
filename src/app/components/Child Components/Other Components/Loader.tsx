import { motion } from "framer-motion";
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="w-4 h-4 bg-white rounded-full absolute"
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              style={{
                top: `${Math.sin((index * Math.PI) / 4) * 50}px`,
                left: `${Math.cos((index * Math.PI) / 4) * 50}px`,
              }}
            />
          ))}
        </motion.div>
        <motion.div
          className="w-32 h-32 border-4 border-white rounded-full"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-white text-3xl font-bold text-center">
            <i>Event Sphare</i>
          </h1>
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20"
        animate={{
          background: [
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.2) 100%)",
            "radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(59,130,246,0.2) 100%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
