"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import mockup1 from "@/../public/resource/joinMockup1.png";
import mockup2 from "@/../public/resource/joinMockup2.png";
import { currentWork, projects } from "@/app/data";
import { TextRevealCard } from "../components/text-reveal-card";
import { useRef } from "react";
import Resume from "../components/Resume";
import ScrollScaleWrapper from "../components/ScrollScaleWrapper";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import MagneticWrapper from "../components/MagneticWrapper";

export default function CurrentWork() {
  const work = currentWork[0];
  const p = projects;
  const container = useRef(null);
  const resumeRef = useRef(null);
  const images = [mockup1, mockup2];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: [0, 1],
  });

  const hue = useTransform(scrollYProgress, [0, 1], ["#ffffff00", "#ffffff20"]);

  return (
    <motion.div
      id="work"
      className={`h-fit flex-row items-center md:py-12 py-4 pb-12`}
      style={{ backgroundColor: hue }}
    >
      <div
        ref={container}
        className="max-w-7xl mx-auto h-full px-4 mt-8 md:pt-12 mb-8 md:mb-16 pt-4"
      >
        <motion.h3
          className="mt-4 md:mt-12 text-3xl md:text-5xl font-semibold text-primary-whiteish"
          initial={{ opacity: 0, translateY: 60 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {work.sectionTitle}
        </motion.h3>
        <div className="gap-x-8 mt-9 bg-primary-vanilla rounded-xl  grid grid-cols-10 text-2xl  text-primary-grey-brighter items-center">
          <div className="w-full col-start-1 px-3 col-span-10 md:px-0 md:col-start-2 md:col-span-5 max-w-[650px] md:pt-0 my-8 md:my-12 pt-2">
            <div className="flex flex-col gap-x-6">
              <motion.h3
                className="text-2xl md:text-4xl font-semibold pb-1 md:pb-4 cursor-pointer text-primary-grey"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {work.title}
              </motion.h3>
              <motion.p
                className="text-base md:text-lg font-medium"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {work.description}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3 mt-6"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {Object.values(work.tags).map((tag, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 w-fit text-sm cursor-default"
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <ScrollScaleWrapper
            fade={true}
            className="col-start-2 col-span-8 md:col-start-7 md:col-span-4 py-6 md:my-20 pr-0 md:pr-9"
          >
            <ImageSlider images={images} intervalTime={5000} />
          </ScrollScaleWrapper>
        </div>
      </div>

      {/*  Projects */}
      <div className="max-w-7xl mx-auto h-full px-4 mt-8 md:pt-12 mb-8 md:mb-16 pt-4">
        <motion.h3
          className="mt-4 md:mt-12 text-3xl md:text-5xl font-semibold text-primary-whiteish"
          initial={{ opacity: 0, translateY: 60 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h3>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
          {Object.values(p).map((project, index) => (
            <Link
              key={index}
              href={`/projects/${project.projectSlug}`}
              className="bg-primary-vanilla rounded-xl p-4 group hover:bg-secondary-green-lighter active:bg-secondary-green-darker transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col h-full">
                <div className="flex w-full justify-between">
                  <motion.h3
                    className="text-2xl md:text-3xl font-semibold cursor-pointer text-primary-grey"
                    initial={{ opacity: 0, translateY: 60 }}
                    whileInView={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    {project.title}
                  </motion.h3>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 sm:size-10 md:size-12 text-primary-grey group-hover:scale-110 transition-all duration-300 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
                <motion.p
                  className="text-lg md:text-xl font-medium text-secondary-grey  text-primary-grey"
                  initial={{ opacity: 0, translateY: 20 }}
                  whileInView={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.1,
                  }}
                >
                  {project.subtitle}
                </motion.p>

                <MagneticWrapper magneticStrength={0.2}>
                  <div
                    className="w-full p-12 sm:p-14 md:p-16 lg:p-20 items-center justify-center inline-block rounded-lg hover:scale-105 duration-200 ease-in-out"
                    dangerouslySetInnerHTML={{
                      __html: project.cardImage,
                    }}
                  />
                </MagneticWrapper>

                <div className="flex flex-wrap gap-3">
                  {Object.values(project.tags).map((tag, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 w-fit text-sm cursor-default"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto h-full px-4 w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <motion.div
          id="about"
          ref={resumeRef}
          className="pt-0 sm:pt-36 flex flex-row items-center justify-center gap-x-0 md:gap-x-20 md:p-0 sm:pb-16 pb-0 w-full"
          initial={{ opacity: 0, translateY: 60 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <TextRevealCard
            text="Are You a LinkedIn Stalker?"
            revealText="Feel free to read!"
          ></TextRevealCard>
        </motion.div>

        <Resume></Resume>
      </div>
    </motion.div>
  );
}
