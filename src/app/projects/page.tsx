"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { footerLinks } from "@/app/data";
import ProfilePicture from "../../../public/resource/profileImage.jpg";
import Image from "next/legacy/image";
import ProjectGrid from "@/app/components//projectHoverEffect/ProjectsHoverGrid";

const ProjectsPage: React.FC = () => {
  return (
    <motion.div
      id="header"
      animate={{
        backgroundColor: ["#FAF5F0", "#DEF5F0", "#FAF0F4"],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <div className="max-w-5xl px-4 mx-auto h-full min-h-screen flex flex-col">
        <div className="md:pt-36 pt-20 md:pb-4 pb-0 flex md:flex-row flex-col items-center justify-between">
          <div className="flex gap-8 items-center justify-start">
            <Image
              className="h-auto w-16 lg:w-24 rounded-full drop-shadow-lg shadow-md md:shadow-customShadow"
              src={ProfilePicture}
              placeholder="blur"
              alt="image description"
            />
            <div className="flex flex-col gap-[6px] justify-center items-start">
              <h1 className="text-xl md:text-2xl font-bold text-primary-blackish">
                André Roxhage
              </h1>
              <h2 className="text-sm md:text-base font-medium text-primary-grey">
                Software Design Engineer
              </h2>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-[6px] justify-center items-start">
            <div className="flex gap-4">
              <Link href="/#about" id="link1">
                <label className="text-sm md:text-base font-medium text-primary-grey-brighter cursor-pointer hover:text-secondary-green-darker transition-all duration-300">
                  About
                </label>
              </Link>
              <Link href={footerLinks[2].href}>
                <label className="text-sm md:text-base font-medium text-primary-grey-brighter cursor-pointer hover:text-secondary-green-darker transition-all duration-300">
                  Email
                </label>
              </Link>
              <Link href={footerLinks[0].href}>
                <label className="text-sm md:text-base font-medium text-primary-grey-brighter cursor-pointer hover:text-secondary-green-darker transition-all duration-300">
                  LinkedIn
                </label>
              </Link>
            </div>
          </div>
        </div>
        <ProjectGrid />
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
