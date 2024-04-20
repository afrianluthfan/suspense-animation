/* eslint-disable no-console */

"use client";

import { useEffect, useRef, useState } from "react";
import { useDimensions } from "@/hooks/use-dimension";
import { motion, useCycle } from "framer-motion";
import Toggle from "./Toggle";
import { NavItem } from "./NavItem";
import TransitionLayer from "../TransitionLayer.tsx/TransitionLayer";

const variants = {
  open: {
    transition: { staggerChildren: 0.03 },
  },
  closed: {
    transition: { staggerChildren: 0.01 },
  },
};

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [toggleEyeColor, changeColor] = useState("#45AAE0");
  const containerRef = useRef<HTMLDivElement>(null);

  const { height } = useDimensions(containerRef);

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  const [startExitTransition, setStarExitTransition] = useState(false);
  const handleAnimationTrigger = () => {
    setStarExitTransition(!startExitTransition);
  };
  const resetTransition = () => {
    setStarExitTransition(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        toggleOpen();
      }
    };

    if (isOpen) {
      changeColor("#D11515");
    } else {
      changeColor("#45AAE0");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, containerRef, toggleOpen]);

  return (
    <TransitionLayer
      bgColor={currentPage}
      exitStart={startExitTransition}
      reset={resetTransition}
    >
      {/* exitStart is used to start the exit animation */}
      <motion.nav
        className="max-w-screen h-fit py-2"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
        custom={height}
      >
        <div className="nav__wrapper flex items-center justify-between px-5">
          <div>Djangos.id</div>
          <div className="h-12 w-12">
            <Toggle
              toggle={toggleOpen}
              isOpen={isOpen}
              eyeColor={toggleEyeColor}
            />
          </div>
          <div>Book Now</div>
        </div>

        <motion.div>
          <motion.ul variants={variants} className="flex flex-row flex-wrap">
            <NavItem
              pageTracking={handleAnimationTrigger}
              pageChange={handlePageChange}
            />
          </motion.ul>
        </motion.div>
      </motion.nav>
    </TransitionLayer>
  );
};

export default Navbar;
