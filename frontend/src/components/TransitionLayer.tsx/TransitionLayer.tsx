"use client";

import React, { FC, useEffect, useState } from "react";
import TransitionLayerEntry from "./TransitionLayerEntry";
import TransitionLayerExit from "./TransitionLayerExit";

interface TransitionLayerProps {
  bgColor: number;
  children: React.ReactNode;
  exitStart: boolean;
  reset: () => void;
}

const TransitionLayer: FC<TransitionLayerProps> = ({
  bgColor,
  children,
  exitStart,
  reset,
}) => {
  const [exitTrigger, setExitTrigger] = useState(false);
  const [entryTrigger, setEntryTrigger] = useState(false);

  useEffect(() => {
    setExitTrigger(exitStart);
  }, [exitStart]);

  const handleExitReset = () => {
    setExitTrigger(false);
    setEntryTrigger(true);
    reset();
  };

  const handleEntryReset = () => {
    setEntryTrigger(false);
  };

  return (
    <>
      {entryTrigger ? (
        <TransitionLayerEntry bgColor={bgColor} reset={handleEntryReset} />
      ) : null}
      {exitTrigger ? (
        <TransitionLayerExit bgColor={bgColor} reset={handleExitReset} />
      ) : null}
      {children}
    </>
  );
};

export default TransitionLayer;
