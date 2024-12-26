"use client";

import Picture1 from "../../../../public/resource/carousel/1.jpg";
import Picture2 from "../../../../public/resource/carousel/2.jpg";
import Picture3 from "../../../../public/resource/carousel/3.jpg";
import Picture4 from "../../../../public/resource/carousel/4.jpg";
import Picture5 from "../../../../public/resource/carousel/5.jpg";
import Picture6 from "../../../../public/resource/carousel/6.jpg";
import Picture7 from "../../../../public/resource/carousel/7.jpg";
import styles from "./styles.module.css";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <motion.div
        className={styles.sticky}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          delay: 0.2,
        }}
        viewport={{ once: true }}
      >
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <Image
                  src={src}
                  className="rounded-sm"
                  fill
                  alt="image"
                  placeholder="blur"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
