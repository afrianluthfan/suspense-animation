"use client";

import React, { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

interface TransitionLayerExitProps {
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

const TransitionLayerExit: FC<TransitionLayerExitProps> = ({
  bgColor,
  reset,
}) => {
  const router = useRouter();
  const endHandler = () => {
    router.push("/page1");
    reset();
  };

  // eslint-disable-next-line no-console
  console.log(bgColor);

  useGSAP(() => {
    gsap.fromTo(
      ".anim",
      { y: "300vh" },
      {
        y: "-100vh",
        duration: 1.8,
        ease: "easeInOut",
        onComplete: () => endHandler(),
      },
    );
  });

  return (
    <div className="absolute z-10 flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden">
      <div
        style={{
          backgroundColor: colors[bgColor],
        }}
        className="anim absolute aspect-square min-h-[400vh] w-auto rounded-t-full"
      />
    </div>
  );
};

export default TransitionLayerExit;
