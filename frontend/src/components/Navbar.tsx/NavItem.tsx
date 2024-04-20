/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */

import Link from "next/link";
import { motion } from "framer-motion";
import { FC } from "react";

interface NavItemProps {
  pageTracking: () => void; // executes function in parent component (Navbar.tsx)
  pageChange: (arg0: number) => void;
}

const variants = {
  open: {
    y: 25,
    opacity: 1,
    transition: {
      y: { stiffness: 500, velocity: 100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 500 },
    },
  },
};

const itemIds = [0, 1, 2, 3, 4];
const colors = [
  "#f5adcd",
  "#f5adcd",
  "#fb7110",
  "#ffe5b4",
  "#0f4e43",
  "#ffffff",
  "#4400ff",
];

export const NavItem: FC<NavItemProps> = ({ pageTracking, pageChange }) => {
  const handlePageChange = (page: number) => {
    pageTracking();

    pageChange(page);
    console.log("pageNo NavItem: ", page);
  };

  return (
    <>
      {itemIds.map((i) => (
        <motion.li
          key={i}
          style={{ backgroundColor: colors[i] }}
          className="flex h-10 w-full items-center justify-center border border-black align-middle sm:w-1/2"
          variants={variants}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(i)}
        >
          <div className="text-placeholder flex h-full w-full text-center uppercase"> 
            <p className="w-full text-center">Lorem</p>
          </div>
        </motion.li>
      ))}
      <motion.li
        className="flex h-10 w-1/2 items-center justify-center border border-black bg-red-500 align-middle sm:w-1/4"
        variants={variants}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-placeholder uppercase">
          <Link href="/">wazzup</Link>
        </div>
      </motion.li>
      <motion.li
        className="flex h-10 w-1/2 items-center justify-center border border-black bg-red-500 align-middle sm:w-1/4"
        variants={variants}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-placeholder uppercase">ige</div>
      </motion.li>
    </>
  );
};
