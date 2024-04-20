/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */

"use client";

import * as React from "react";
import { motion } from "framer-motion";

type ToggleProps = {
  toggle: () => void;
  isOpen: boolean;
  eyeColor: string;
};

const Toggle = ({ toggle, isOpen, eyeColor }: ToggleProps) => {
  // const [eyeColor, changeColor] = React.useState("#45AAE0");
  const eyeRef = React.useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const movePupil = (mouseX: number, mouseY: number) => {
    const eyeRect = eyeRef.current?.getBoundingClientRect();
    const eyeCenterX = (eyeRect?.left ?? 0) + (eyeRect?.width ?? 0) / 2;
    const eyeCenterY = (eyeRect?.top ?? 0) + (eyeRect?.height ?? 0) / 2;

    const deltaX = mouseX - eyeCenterX!;
    const deltaY = mouseY - eyeCenterY!;

    // Calculate the angle between the eye center and the cursor position
    const angleRadians = Math.atan2(deltaY, deltaX);

    // Set the maximum movement speed
    const maxSpeed = 10; // You can adjust this value to control the speed

    // Calculate the distance between the current position and the target position
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    // Limit the distance to the maximum speed
    const limitedDistance = Math.min(distance, maxSpeed);

    // Calculate the new position based on the limited distance
    const movementX = Math.cos(angleRadians) * limitedDistance;
    const movementY = Math.sin(angleRadians) * limitedDistance;

    return {
      x: movementX,
      y: movementY,
    };
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { x: pupilX, y: pupilY } = movePupil(mousePosition.x, mousePosition.y);

  const handleButtonClick = () => {
    // if (!isOpen) {
    //   changeColor("#D11515");
    // } else {
    //   changeColor("#45AAE0");
    // }
    toggle(); // Call the toggle function
  };

  const irisTransition = {
    duration: 0.5, // Adjust the duration as needed
    ease: "easeInOut", // Adjust the ease function as needed
  };

  return (
    <button onClick={handleButtonClick} className="h-full w-full" ref={eyeRef}>
      <svg
        // width={66}
        // height={66}
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="eye">
          <g id="white">
            <path
              id="Vector"
              d="M3.30237 21.0813C0.945958 26.9529 0.382922 33.3912 1.68441 39.5826C2.9859 45.774 6.09349 51.4407 10.6145 55.8666C15.1355 60.2925 20.867 63.2788 27.0847 64.4483C33.3025 65.6179 39.7273 64.918 45.5474 62.4372C51.3675 59.9565 56.3216 55.8061 59.7837 50.5107C63.2458 45.2153 65.0605 39.0124 64.9985 32.686C64.9364 26.3595 63.0004 20.1934 59.4351 14.9669C55.8698 9.74043 50.8352 5.68807 44.9676 3.32195C37.0934 0.158876 28.2853 0.25289 20.4804 3.58331C12.6755 6.91374 6.51305 13.2078 3.3483 21.0813"
              fill="#EEE8DA"
            />
            <path
              id="Vector_2"
              d="M3.30237 21.0815C0.945958 26.9531 0.382922 33.3913 1.68441 39.5828C2.9859 45.7742 6.09349 51.4409 10.6145 55.8668C15.1355 60.2926 20.867 63.279 27.0847 64.4485C33.3025 65.618 39.7273 64.9182 45.5474 62.4374C51.3675 59.9566 56.3216 55.8063 59.7837 50.5109C63.2458 45.2154 65.0605 39.0126 64.9985 32.6861C64.9364 26.3597 63.0004 20.1936 59.4351 14.9671C55.8698 9.7406 50.8352 5.68824 44.9676 3.32212C41.0661 1.74884 36.8927 0.96028 32.6861 1.00154C28.4796 1.0428 24.3225 1.91307 20.4526 3.56257C16.5827 5.21207 13.076 7.60841 10.1332 10.6145C7.19038 13.6206 4.86919 17.1774 3.30237 21.0815Z"
              stroke="#231F20"
              strokeWidth={0.5}
              strokeMiterlimit={10}
            />
          </g>
          <motion.g
            id="iris"
            animate={isOpen ? { y: "23%" } : { x: pupilX, y: pupilY }}
            transition={
              isOpen
                ? { duration: 0.5, ease: "easeInOut" }
                : { duration: 0, ease: "easeInOut" }
            }
          >
            <motion.path
              id="Vector_3"
              d="M19.375 32.5674C19.3786 35.3181 20.1978 38.006 21.7289 40.2912C23.2599 42.5765 25.4341 44.3565 27.9767 45.4062C30.5192 46.4559 33.3159 46.7282 36.0132 46.1887C38.7105 45.6491 41.1872 44.322 43.1304 42.375C45.0735 40.428 46.3957 37.9486 46.9299 35.2503C47.4641 32.5519 47.1862 29.7558 46.1315 27.2153C45.0767 24.6749 43.2924 22.5042 41.0042 20.9777C38.7159 19.4511 36.0264 18.6373 33.2757 18.6392C31.4482 18.6404 29.639 19.0017 27.9512 19.7024C26.2635 20.4031 24.7303 21.4295 23.4394 22.723C22.1485 24.0165 21.1251 25.5517 20.4277 27.2408C19.7303 28.9299 19.3726 30.7399 19.375 32.5674Z"
              fill={eyeColor}
              animate={{ fill: eyeColor }} // Animate the fill color
              transition={irisTransition} // Apply the defined transition
            />
          </motion.g>
          <motion.g
            id="pupil"
            animate={isOpen ? { y: "23%" } : { x: pupilX, y: pupilY }}
            transition={
              isOpen
                ? { duration: 0.5, ease: "easeInOut" }
                : { duration: 0, ease: "easeInOut" }
            }
          >
            <path
              id="Vector_4"
              d="M28.5625 32.719C28.5625 33.6675 28.8437 34.5947 29.3707 35.3834C29.8977 36.1721 30.6467 36.7868 31.523 37.1498C32.3994 37.5127 33.3637 37.6077 34.294 37.4227C35.2243 37.2376 36.0788 36.7809 36.7495 36.1101C37.4202 35.4394 37.877 34.5849 38.062 33.6546C38.2471 32.7243 38.1521 31.76 37.7891 30.8837C37.4261 30.0073 36.8115 29.2583 36.0228 28.7313C35.2341 28.2044 34.3069 27.9231 33.3583 27.9231C32.0864 27.9231 30.8665 28.4284 29.9671 29.3278C29.0677 30.2272 28.5625 31.447 28.5625 32.719Z"
              fill="#010101"
            />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};
export default Toggle;
