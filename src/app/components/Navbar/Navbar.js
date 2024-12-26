"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import Nav from "./Nav";

const menu = {
  open: {
    width: "fit-content",
    height: "fit-content",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.4, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.4,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isActive && !event.target.closest(".nav-container")) {
        setIsActive(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <>
      <nav className="fixed h-10 right-10 top-10 z-50 hidden md:block">
        <motion.div
          className="h-60 bg-secondary-green rounded-md relative nav-container"
          variants={menu}
          animate={isActive ? "open" : "closed"}
          initial="closed"
        >
          <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
        </motion.div>
        <Button
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
        />
      </nav>

      <nav className="fixed h-10 right-8 md:right-10 bottom-2 md:top-10 md:bottom-auto z-50 md:hidden">
        <motion.div
          className="bg-secondary-green rounded-md relative nav-container origin-bottom"
          variants={menu}
          animate={isActive ? "open" : "closed"}
          initial="closed"
          style={{ transformOrigin: "bottom" }}
        >
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                className="absolute bottom-full mb-4 right-0  sm:bg-none bg-secondary-green rounded-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Nav />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
      </nav>
    </>
  );
}
