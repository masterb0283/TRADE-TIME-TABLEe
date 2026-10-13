"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function SplashScreen() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("splash-seen");
    if (seen || reduced) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("splash-seen", "1");
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.02em" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl font-semibold text-[var(--text)]"
          >
            BB<span className="text-accent">J</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
