import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollScaleWrapper({
  children,
  className,
  scaleFrom = 0.92,
  scaleTo = 1,
  fade = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });

  const scale = useTransform(scrollYProgress, [1, 0], [scaleFrom, scaleTo]);

  return (
    <>
      {fade && (
        <motion.div
          ref={ref}
          style={{ scale: scale }}
          className={`w-100 h-100 ${className}`}
          initial={{ opacity: 0, translateY: 20 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      )}
      {!fade && (
        <motion.div
          ref={ref}
          style={{ scale: scale }}
          className={`w-100 h-100 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
