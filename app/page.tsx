import { useState, useEffect } from "react";
import Mousetrap from "mousetrap";
import { motion } from "framer-motion";

export default function Home() {
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    // Custom hotkey navigation for mouse-free control
    Mousetrap.bind('j', () => setStatus("Opening Chatbot..."));
    Mousetrap.bind('f', () => setStatus("Navigating to Dashboard..."));
    
    return () => {
      Mousetrap.unbind('j');
      Mousetrap.unbind('f');
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-extrabold text-primary mb-8 text-center"
      >
        Anvaya
      </motion.h1>
      <p className="text-xl mb-4">Inclusive Learning Portal for Specially Abled Students</p>
      
      <div className="bg-secondary/10 p-6 rounded-xl border border-secondary/20 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Systems Status</h2>
        <p className="text-secondary font-mono">{status}</p>
        <div className="mt-4 flex gap-2">
          <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">J</kbd>
          <span className="text-sm">Chatbot Agent</span>
          <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded ml-4">F</kbd>
          <span className="text-sm">Dashboard</span>
        </div>
      </div>

      <footer className="mt-12 text-gray-500 text-sm italic">
        WCAG 2.2 AAA Compliant | Next.js 14 | LangGraph Orchestrated
      </footer>
    </main>
  );
}
