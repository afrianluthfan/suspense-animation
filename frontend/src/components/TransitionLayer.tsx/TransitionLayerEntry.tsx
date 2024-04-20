"use client";

import React, { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TransitionLayerEntryProps {
  bgColor: number;
  reset: () => void;
}

const colors = [
  "#f5adcd",
  "#f5adcd",
  "#fb7110",
  "#ffe5b4",
  "#0f4e43",
  "#ffffff",
  "#4400ff",
];

const TransitionLayerEntry: FC<TransitionLayerEntryProps> = ({
  bgColor,
  reset,
}) => {
  const endHandler = () => {
    reset();
    // eslint-disable-next-line no-console
    console.log(colors[bgColor]);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".anim", { borderWidth: 0, duration: 2, ease: "easeInOut" });
    tl.to(".anim", { visibility: "hidden", display: "none", duration: 0.1 });
    tl.to(".wrapping", {
      visibility: "hidden",
      display: "none",
      duration: 0.1,
      onComplete: () => endHandler(),
    });
  });

  return (
    <div className="wrapping absolute z-10 flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden ">
      <div
        style={{
          borderColor: colors[bgColor],
        }}
        className="anim absolute aspect-square min-w-[250vh] rounded-[10000px] border-[200vw]"
      />
    </div>
  );
};

export default TransitionLayerEntry;
