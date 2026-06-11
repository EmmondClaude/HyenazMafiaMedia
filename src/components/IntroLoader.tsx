"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoadingScreen } from "./LoadingScreen";

/**
 * First-load brand splash. Static pages render instantly, so the App Router
 * loading.tsx fallback is never really seen — this client overlay guarantees the
 * loading screen actually shows: it covers the first paint, then fades out, and
 * stays out for the rest of the tab session (no re-trigger on every navigation).
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Returning within the session: dismiss on the next tick (no re-show).
    const delay = sessionStorage.getItem("hmm-intro") ? 0 : 1900;
    const t = setTimeout(() => {
      sessionStorage.setItem("hmm-intro", "1");
      setShow(false);
    }, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <LoadingScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
