"use client";
import Study from "../../../public/resource/lund.jpg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { about } from "../data";
import ScrollScaleWrapper from "../components/ScrollScaleWrapper";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTitleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="bg-primary-vanilla h-fit my-auto pt-2 md:pt-0 flex-row items-center relative">
        <div className="max-w-7xl mx-auto px-4 h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center">
          <motion.div
            className="pl-1 w-full sm:pl-0 col-start-1 md:col-span-6 max-w-[660px] col-span-10 min-h-100 md:pt-8 pt-14"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex flex-row gap-x-6">
              {about.map((item, index) => (
                <div key={index}>
                  <motion.h3
                    className={`text-xl md:text-3xl font-semibold pb-1 md:pb-4 cursor-pointer  ${
                      activeIndex === index
                        ? "text-primary-grey"
                        : "text-primary-grey-brighter"
                    } hover:text-secondary-green-darker`}
                    onClick={() => handleTitleClick(index)}
                    whileHover={{
                      translateY: -4,
                      color: [
                        { color: "text-secondary-green-darker" },
                        { color: "text-primary-grey-brighter" },
                      ],
                      transition: { duration: 0.2, ease: "easeInOut" },
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.hr
                        className="h-0.5 pt-2 col-start-1 col-end-4 border-primary-grey"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        exit={{ width: "0%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        key="line"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {about.map(
                (item, index) =>
                  activeIndex === index && (
                    <motion.p
                      key={index}
                      className="text-base md:text-lg font-medium md:max-w-[700px] md:col-span-5 col-span-9 w-full h-60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {item.description}
                    </motion.p>
                  ),
              )}
            </AnimatePresence>
          </motion.div>
          <ScrollScaleWrapper
            fade={true}
            className="col-start-1 col-span-10 md:col-start-7 md:col-span-4 md:my-20 mt-12 mb-12"
          >
            <Image
              className="h-full w-full rounded-sm"
              src={Study}
              placeholder="blur"
              alt="Lunds university building and a clear blue sky"
            />
          </ScrollScaleWrapper>
        </div>
      </div>
    </>
  );
}
