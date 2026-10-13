"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1.6, bounce: 0 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  React.useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.floor(v)));
    return unsub;
  }, [spring]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
