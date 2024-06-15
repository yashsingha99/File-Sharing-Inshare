import React from "react";
import { motion } from "framer-motion";

function Button({ onClick, text }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
    >
      {text}
    </motion.button>
  );
}
export default Button;
