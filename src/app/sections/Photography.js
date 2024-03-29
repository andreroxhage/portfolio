"use client";
import ZoomParallax from "../components/ZoomParallax/ZoomParallax.js";
import { motion } from "framer-motion";
import { photo } from "../data.js";

export default function Photography() {
  return (
    <section id="photography" className="bg-primary-vanilla w-full relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-10 px-6 py-40 mb-12">
        <div className="sm:col-start-2 sm:col-span-3 col-start-1 col-span-10 flex items-center">
          <motion.h3
            className="text-primary-grey text-xl md:text-3xl font-semibold"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {photo.title}
          </motion.h3>
        </div>
        <div className="sm:col-start-6 sm:col-span-5 col-start-1 col-span-10">
          <motion.p
            className="text-primary-grey-brighter text-base md:text-lg font-medium w-full sm:max-w-[680px] sm:mt-0 mt-1"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {photo.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
