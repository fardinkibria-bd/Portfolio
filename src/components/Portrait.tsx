import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";
import { GlassCard } from "./GlassCard";
import { fadeIn, duration } from "../utils/animations";

export function Portrait() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="hero-portrait-col">
      <motion.div
        className="hero-portrait-wrapper"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: duration.slower, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          className="hero-portrait-img"
          src={content.portrait.src}
          alt={content.portrait.alt}
          width={content.portrait.width}
          height={content.portrait.height}
          loading="eager"
          onLoad={() => setIsLoaded(true)}
          initial={{ filter: "blur(20px) contrast(1.05)", opacity: 0 }}
          animate={
            isLoaded
              ? { filter: "blur(0px) contrast(1.05)", opacity: 1 }
              : { filter: "blur(20px) contrast(1.05)", opacity: 0 }
          }
          transition={{ duration: duration.slower, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <motion.div
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        variants={fadeIn}
      >
        <GlassCard />
      </motion.div>
    </div>
  );
}
